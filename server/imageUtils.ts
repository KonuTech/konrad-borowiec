import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const mkdirAsync = promisify(fs.mkdir);

// Directory cache to avoid redundant fs checks
const dirCache = new Set<string>();

// Ensure a directory exists with caching for better performance
async function ensureDirectoryExists(dir: string) {
  if (dirCache.has(dir)) return;
  
  try {
    if (!fs.existsSync(dir)) {
      await mkdirAsync(dir, { recursive: true });
    }
    dirCache.add(dir);
  } catch (error) {
    console.error(`Error creating directory ${dir}:`, error);
    throw error;
  }
}

// Ensure the public image directories exist - only creates what's needed
export async function ensureImageDirectories() {
  const publicDir = path.join(process.cwd(), 'public');
  const imagesDir = path.join(publicDir, 'images');
  const projectImagesDir = path.join(imagesDir, 'projects');
  const motorcycleImagesDir = path.join(imagesDir, 'motorcycles');
  const cyclingImagesDir = path.join(imagesDir, 'cycling');
  
  try {
    // Use recursive flag to create all directories in a single call if needed
    await ensureDirectoryExists(publicDir);
    await ensureDirectoryExists(imagesDir);
    await ensureDirectoryExists(projectImagesDir);
    await ensureDirectoryExists(motorcycleImagesDir);
    await ensureDirectoryExists(cyclingImagesDir);
  } catch (error) {
    console.error('Error creating image directories:', error);
  }
}