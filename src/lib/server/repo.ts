import { ObjectId, type Db } from 'mongodb';
import { getBucket, getDb } from './db';
import { defaultContent, defaultPhotos, defaultProjects, withBundledLogo } from '../content/defaults';
import type { Photo, Project, SiteContent, SiteData } from '../content/types';

type PhotoDoc = Omit<Photo, 'id'> & { _id: string };
type ProjectDoc = Omit<Project, 'id'> & { _id: string };
type SettingsDoc = { _id: string; data?: unknown; updatedAt?: Date };

export type DbStatus = 'ok' | 'off' | 'error';

const photosCol = (db: Db) => db.collection<PhotoDoc>('photos');
const projectsCol = (db: Db) => db.collection<ProjectDoc>('projects');
const settingsCol = (db: Db) => db.collection<SettingsDoc>('settings');

const toPhoto = ({ _id, ...rest }: PhotoDoc): Photo => ({ id: _id, ...rest });
const toProject = ({ _id, ...rest }: ProjectDoc): Project => ({ id: _id, ...rest });

/** Recursively fills fields missing in stored content with defaults, so new fields never break old data. */
export function mergeContent<T>(base: T, stored: unknown): T {
  if (Array.isArray(base)) {
    if (!Array.isArray(stored)) return structuredClone(base);
    return stored.map((item, index) => mergeContent(base[index] ?? base[0] ?? item, item)) as T;
  }
  if (base && typeof base === 'object') {
    const source = stored && typeof stored === 'object' && !Array.isArray(stored) ? (stored as Record<string, unknown>) : {};
    const out: Record<string, unknown> = {};
    for (const key of Object.keys(base)) out[key] = mergeContent((base as Record<string, unknown>)[key], source[key]);
    return out as T;
  }
  if (typeof base === 'string') return (typeof stored === 'string' ? stored : base) as T;
  if (typeof base === 'boolean') return (typeof stored === 'boolean' ? stored : base) as T;
  if (typeof base === 'number') return (typeof stored === 'number' ? stored : base) as T;
  return (stored ?? base) as T;
}

let seeding: Promise<void> | null = null;

/** First run: copy the default photos and projects into the database exactly once. */
async function ensureSeeded(db: Db) {
  seeding ??= (async () => {
    const marker = await settingsCol(db).findOne({ _id: 'seed' });
    if (marker) return;
    const photos = defaultPhotos.map(({ id, ...rest }) => ({ _id: id, ...rest }));
    const projects = defaultProjects.map(({ id, ...rest }) => ({ _id: id, ...rest }));
    for (const doc of photos) await photosCol(db).updateOne({ _id: doc._id }, { $setOnInsert: doc }, { upsert: true });
    for (const doc of projects) await projectsCol(db).updateOne({ _id: doc._id }, { $setOnInsert: doc }, { upsert: true });
    await settingsCol(db).updateOne({ _id: 'seed' }, { $setOnInsert: { _id: 'seed', updatedAt: new Date() } }, { upsert: true });
  })().catch((error) => {
    seeding = null;
    throw error;
  });
  await seeding;
}

async function requireDb() {
  const db = await getDb();
  if (!db) throw new Error('Databáze není nastavená. Doplňte MONGODB_URI do proměnných prostředí.');
  await ensureSeeded(db);
  return db;
}

const fallback = (): SiteData => ({
  content: structuredClone(defaultContent),
  photos: structuredClone(defaultPhotos),
  projects: structuredClone(defaultProjects)
});

export async function loadSite(): Promise<SiteData & { status: DbStatus }> {
  let db: Db | null;
  try {
    db = await getDb();
  } catch (error) {
    console.error('MongoDB není dostupná, zobrazuji výchozí obsah:', error);
    return { ...fallback(), status: 'error' };
  }
  if (!db) return { ...fallback(), status: 'off' };
  try {
    await ensureSeeded(db);
    const [settings, photos, projects] = await Promise.all([
      settingsCol(db).findOne({ _id: 'content' }),
      photosCol(db).find().sort({ order: 1, _id: 1 }).toArray(),
      projectsCol(db).find().sort({ order: 1, _id: 1 }).toArray()
    ]);
    return {
      content: withBundledLogo(mergeContent(defaultContent, settings?.data)),
      photos: photos.map(toPhoto),
      projects: projects.map(toProject),
      status: 'ok'
    };
  } catch (error) {
    console.error('Čtení z MongoDB selhalo, zobrazuji výchozí obsah:', error);
    return { ...fallback(), status: 'error' };
  }
}

// ---------- Texty ----------

export async function saveContent(content: SiteContent) {
  const db = await requireDb();
  await settingsCol(db).updateOne({ _id: 'content' }, { $set: { data: content, updatedAt: new Date() } }, { upsert: true });
}

// ---------- Fotky ----------

async function storeFile(data: Uint8Array, name: string, contentType: string) {
  const bucket = await getBucket();
  return new Promise<string>((resolve, reject) => {
    const stream = bucket.openUploadStream(name, { metadata: { contentType } });
    stream.once('error', reject);
    stream.once('finish', () => resolve(stream.id.toString()));
    stream.end(Buffer.from(data));
  });
}

async function deleteFiles(ids: string[]) {
  if (!ids.length) return;
  const bucket = await getBucket();
  for (const fileId of ids) {
    if (ObjectId.isValid(fileId)) await bucket.delete(new ObjectId(fileId)).catch(() => undefined);
  }
}

async function readContent(db: Db) {
  const settings = await settingsCol(db).findOne({ _id: 'content' });
  return mergeContent(defaultContent, settings?.data);
}

// ---------- Logo ----------

export async function saveLogo(input: { logo: Uint8Array; favicon: Uint8Array; width: number; height: number }) {
  const db = await requireDb();
  const content = await readContent(db);
  const stamp = Date.now();
  const logoId = await storeFile(input.logo, `logo-${stamp}.png`, 'image/png');
  const faviconId = await storeFile(input.favicon, `favicon-${stamp}.png`, 'image/png');
  const previous = content.brand.logoFiles;
  content.brand = {
    ...content.brand,
    logo: `/media/${logoId}`,
    favicon: `/media/${faviconId}`,
    logoWidth: input.width,
    logoHeight: input.height,
    logoFiles: [logoId, faviconId]
  };
  await saveContent(content);
  await deleteFiles(previous);
  return content.brand;
}

export async function removeLogo() {
  const db = await requireDb();
  const content = await readContent(db);
  const previous = content.brand.logoFiles;
  content.brand = { ...content.brand, logo: '', favicon: '', logoWidth: 0, logoHeight: 0, logoFiles: [] };
  await saveContent(content);
  await deleteFiles(previous);
}

export async function saveLogoSettings(settings: { logoText: boolean; logoSize: string }) {
  const db = await requireDb();
  const content = await readContent(db);
  content.brand = { ...content.brand, ...settings };
  await saveContent(content);
}

export async function addUploadedPhoto(input: { full: Uint8Array; thumb: Uint8Array; type: string; alt: string; category: string; width: number; height: number }) {
  const db = await requireDb();
  const bucket = await getBucket();
  const store = (data: Uint8Array, name: string) =>
    new Promise<string>((resolve, reject) => {
      const stream = bucket.openUploadStream(name, { metadata: { contentType: input.type } });
      stream.once('error', reject);
      stream.once('finish', () => resolve(stream.id.toString()));
      stream.end(Buffer.from(data));
    });
  const id = new ObjectId().toString();
  const fullId = await store(input.full, `${id}.webp`);
  const thumbId = await store(input.thumb, `${id}-nahled.webp`);
  const last = await photosCol(db).find().sort({ order: -1 }).limit(1).next();
  const doc: PhotoDoc = {
    _id: id,
    src: `/media/${fullId}`,
    thumb: `/media/${thumbId}`,
    alt: input.alt,
    category: input.category,
    width: input.width,
    height: input.height,
    inGallery: true,
    order: (last?.order ?? -1) + 1,
    source: 'upload',
    fileIds: [fullId, thumbId]
  };
  await photosCol(db).insertOne(doc);
  return toPhoto(doc);
}

export async function updatePhoto(id: string, patch: Pick<Photo, 'alt' | 'category' | 'inGallery'>) {
  const db = await requireDb();
  await photosCol(db).updateOne({ _id: id }, { $set: patch });
}

export async function reorderPhotos(ids: string[]) {
  const db = await requireDb();
  await Promise.all(ids.map((id, order) => photosCol(db).updateOne({ _id: id }, { $set: { order } })));
}

export async function deletePhoto(id: string) {
  const db = await requireDb();
  const doc = await photosCol(db).findOne({ _id: id });
  if (!doc) return;
  await photosCol(db).deleteOne({ _id: id });
  await projectsCol(db).updateMany({ photoIds: id }, { $pull: { photoIds: id } });
  if (doc.source === 'upload' && doc.fileIds?.length) {
    const bucket = await getBucket();
    for (const fileId of doc.fileIds) {
      if (ObjectId.isValid(fileId)) await bucket.delete(new ObjectId(fileId)).catch(() => undefined);
    }
  }
}

// ---------- Realizace ----------

export async function saveProject(project: Project) {
  const db = await requireDb();
  const { id, ...rest } = project;
  const clash = await projectsCol(db).findOne({ slug: rest.slug, _id: { $ne: id } });
  if (clash) throw new Error('Realizace se stejnou adresou už existuje. Zvolte jinou adresu.');
  if (!(await projectsCol(db).findOne({ _id: id }))) {
    const last = await projectsCol(db).find().sort({ order: -1 }).limit(1).next();
    rest.order = (last?.order ?? -1) + 1;
  } else {
    delete (rest as Partial<ProjectDoc>).order;
  }
  await projectsCol(db).updateOne({ _id: id }, { $set: rest }, { upsert: true });
}

export async function deleteProject(id: string) {
  const db = await requireDb();
  await projectsCol(db).deleteOne({ _id: id });
}

export async function reorderProjects(ids: string[]) {
  const db = await requireDb();
  await Promise.all(ids.map((id, order) => projectsCol(db).updateOne({ _id: id }, { $set: { order } })));
}

// ---------- Soubory z GridFS ----------

export async function openMedia(id: string) {
  if (!ObjectId.isValid(id)) return null;
  const db = await getDb();
  if (!db) return null;
  const objectId = new ObjectId(id);
  const file = await db.collection('media.files').findOne({ _id: objectId });
  if (!file) return null;
  const bucket = await getBucket();
  return {
    stream: bucket.openDownloadStream(objectId),
    length: file.length as number,
    type: (file.metadata?.contentType as string) || 'image/webp'
  };
}
