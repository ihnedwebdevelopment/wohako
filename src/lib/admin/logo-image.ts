// Zpracování loga v prohlížeči: oříznutí prázdných okrajů, volitelné odstranění
// jednobarevného pozadí, zmenšení na jednotnou výšku a vytvoření ikony prohlížeče.

export interface ProcessedLogo {
  logo: Blob;
  favicon: Blob;
  width: number;
  height: number;
  preview: string;
  faviconPreview: string;
  /** Původní obrázek měl průhledné pozadí. */
  transparent: boolean;
}

const LOGO_HEIGHT = 200;
const LOGO_MAX_WIDTH = 1200;
const FAVICON = 128;

function canvas(width: number, height: number) {
  const element = document.createElement('canvas');
  element.width = Math.max(1, Math.round(width));
  element.height = Math.max(1, Math.round(height));
  const ctx = element.getContext('2d', { willReadFrequently: true })!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  return { element, ctx };
}

async function loadImage(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    const vector = file.type === 'image/svg+xml' || /\.svg$/i.test(file.name);
    let width = img.naturalWidth || 1200;
    let height = img.naturalHeight || 600;
    // Vektor vykreslíme velký, aby byl ostrý; bitmapu nezvětšujeme.
    const scale = vector ? 2000 / Math.max(width, height) : Math.min(1, 2400 / Math.max(width, height));
    width *= scale;
    height *= scale;
    const { element, ctx } = canvas(width, height);
    ctx.drawImage(img, 0, 0, element.width, element.height);
    return element;
  } catch {
    throw new Error('Obrázek se nepodařilo otevřít. Použijte PNG, JPG, WebP nebo SVG.');
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Postupné zmenšování po polovinách — výrazně ostřejší výsledek než jeden velký skok. */
function downscale(source: HTMLCanvasElement, width: number, height: number) {
  let current = source;
  while (current.width / 2 > width && current.height / 2 > height) {
    const half = canvas(current.width / 2, current.height / 2);
    half.ctx.drawImage(current, 0, 0, half.element.width, half.element.height);
    current = half.element;
  }
  const out = canvas(width, height);
  out.ctx.drawImage(current, 0, 0, out.element.width, out.element.height);
  return out.element;
}

const toBlob = (element: HTMLCanvasElement) =>
  new Promise<Blob>((resolve, reject) => element.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Logo se nepodařilo uložit.'))), 'image/png'));

export async function processLogo(file: File, removeBackground: boolean): Promise<ProcessedLogo> {
  const source = await loadImage(file);
  const { width, height } = source;
  const ctx = source.getContext('2d', { willReadFrequently: true })!;
  const image = ctx.getImageData(0, 0, width, height);
  const px = image.data;

  let transparent = false;
  for (let i = 3; i < px.length; i += 16) if (px[i] < 245) { transparent = true; break; }

  // Barva pozadí = průměr rohů (u loga bez průhlednosti).
  const corners = [0, width - 1, (height - 1) * width, height * width - 1].map((p) => p * 4);
  const bg = [0, 1, 2].map((c) => corners.reduce((sum, p) => sum + px[p + c], 0) / 4);
  const distance = (i: number) => Math.max(Math.abs(px[i] - bg[0]), Math.abs(px[i + 1] - bg[1]), Math.abs(px[i + 2] - bg[2]));

  if (!transparent && removeBackground) {
    for (let i = 0; i < px.length; i += 4) {
      const d = distance(i);
      const alpha = d <= 14 ? 0 : d >= 42 ? 1 : (d - 14) / 28;
      px[i + 3] = Math.round(px[i + 3] * alpha);
    }
    ctx.putImageData(image, 0, 0);
  }
  const useAlpha = transparent || removeBackground;

  // Oříznutí prázdných okrajů.
  let top = height, left = width, right = -1, bottom = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4;
      const filled = useAlpha ? px[i + 3] > 12 : distance(i) > 24;
      if (!filled) continue;
      if (x < left) left = x;
      if (x > right) right = x;
      if (y < top) top = y;
      if (y > bottom) bottom = y;
    }
  }
  if (right < 0) throw new Error('Obrázek je prázdný — nenašel jsem v něm žádné logo.');
  const cropW = right - left + 1;
  const cropH = bottom - top + 1;
  const cropped = canvas(cropW, cropH);
  cropped.ctx.drawImage(source, left, top, cropW, cropH, 0, 0, cropW, cropH);

  // Jednotná výška; velmi široká loga omezíme šířkou.
  let outH = Math.min(LOGO_HEIGHT, cropH);
  let outW = Math.round((cropW * outH) / cropH);
  if (outW > LOGO_MAX_WIDTH) {
    outW = LOGO_MAX_WIDTH;
    outH = Math.round((cropH * outW) / cropW);
  }
  const logoCanvas = downscale(cropped.element, outW, outH);

  // Ikona prohlížeče: čtverec, logo vycentrované na průhledném pozadí.
  const inner = FAVICON - 12;
  const ratio = Math.min(inner / cropW, inner / cropH);
  const iconW = Math.max(1, Math.round(cropW * ratio));
  const iconH = Math.max(1, Math.round(cropH * ratio));
  const scaled = downscale(cropped.element, iconW, iconH);
  const icon = canvas(FAVICON, FAVICON);
  if (!useAlpha) {
    icon.ctx.fillStyle = `rgb(${bg.map(Math.round).join(',')})`;
    icon.ctx.fillRect(0, 0, FAVICON, FAVICON);
  }
  icon.ctx.drawImage(scaled, Math.round((FAVICON - iconW) / 2), Math.round((FAVICON - iconH) / 2));

  const [logo, favicon] = await Promise.all([toBlob(logoCanvas), toBlob(icon.element)]);
  return { logo, favicon, width: outW, height: outH, preview: URL.createObjectURL(logo), faviconPreview: URL.createObjectURL(favicon), transparent };
}
