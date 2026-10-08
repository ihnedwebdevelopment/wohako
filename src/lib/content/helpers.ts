import type { Photo, Project } from './types';

const empty: Photo = { id: '', src: '', thumb: '', alt: '', category: '', width: 4, height: 3, inGallery: false, order: 0, source: 'static' };

/** Finds a photo by id; if it was deleted, falls back to the first photo so pages never break. */
export function pickPhoto(photos: Photo[], id: string | undefined): Photo {
  return photos.find((photo) => photo.id === id) ?? photos[0] ?? empty;
}

export function projectPhotos(project: Project, photos: Photo[]): Photo[] {
  return project.photoIds.map((id) => photos.find((photo) => photo.id === id)).filter((photo): photo is Photo => !!photo);
}

export function projectCover(project: Project, photos: Photo[]): Photo {
  return projectPhotos(project, photos)[0] ?? empty;
}

export function lines(text: string): string[] {
  return text.split('\n').map((line) => line.trim()).filter(Boolean);
}

export function phoneHref(phone: string) {
  const digits = phone.replace(/[^\d+]/g, '');
  return digits.startsWith('+') ? digits : `+420${digits}`;
}

/** Responsive sources: small preview for cards, full photo for large screens. */
export function srcset(photo: Photo) {
  if (!photo.thumb || photo.thumb === photo.src) return undefined;
  return `${photo.thumb} 900w, ${photo.src} ${Math.max(photo.width, 901)}w`;
}
