import { MongoClient, GridFSBucket, type Db } from 'mongodb';
import * as env from '$app/env/private';

// One client per server instance. Vercel reuses warm instances, so the
// connection survives between requests instead of reconnecting every time.
let clientPromise: Promise<MongoClient> | null = null;

export function isDbConfigured() {
  return !!env.MONGODB_URI;
}

export async function getDb(): Promise<Db | null> {
  if (!env.MONGODB_URI) return null;
  if (!clientPromise) {
    const client = new MongoClient(env.MONGODB_URI, {
      appName: 'wohako-web',
      maxPoolSize: 5,
      serverSelectionTimeoutMS: 6000
    });
    clientPromise = client.connect().catch((error) => {
      clientPromise = null;
      throw error;
    });
  }
  const client = await clientPromise;
  return client.db(env.MONGODB_DB || 'wohako');
}

export async function getBucket() {
  const db = await getDb();
  if (!db) throw new Error('Databáze není nastavená (chybí MONGODB_URI).');
  return new GridFSBucket(db, { bucketName: 'media' });
}
