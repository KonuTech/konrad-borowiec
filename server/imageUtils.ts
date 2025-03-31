import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';

const readFileAsync = promisify(fs.readFile);
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
  
  try {
    // Use recursive flag to create all directories in a single call if needed
    await ensureDirectoryExists(publicDir);
    await ensureDirectoryExists(imagesDir);
    await ensureDirectoryExists(projectImagesDir);
    await ensureDirectoryExists(motorcycleImagesDir);
  } catch (error) {
    console.error('Error creating image directories:', error);
  }
}

// Common image processing function to avoid code duplication
async function processImage(
  sharpInstance: sharp.Sharp, 
  outputPath: string,
  options: {
    width?: number,
    height?: number,
    quality?: number,
    optimizationLevel?: 'low' | 'medium' | 'high'
  }
): Promise<string> {
  // Set default options
  const width = options.width || 800;
  const height = options.height;
  const quality = options.quality || 80;
  const optimizationLevel = options.optimizationLevel || 'medium';
  
  // Get image metadata to make smart decisions about resizing
  const metadata = await sharpInstance.metadata();
  const originalWidth = metadata.width || 0;
  
  // Only resize if the original is larger than target width to avoid upscaling
  if ((width && originalWidth > width) || height) {
    sharpInstance = sharpInstance.resize({
      width,
      height,
      fit: 'cover',
      position: 'center',
      withoutEnlargement: true // Prevent upscaling small images
    });
  }
  
  // Apply optimization based on level - calculate once
  const outputQuality = optimizationLevel === 'high' 
    ? Math.min(quality, 60) 
    : (optimizationLevel === 'medium' ? Math.min(quality, 75) : quality);
  
  // Apply sharpening based on optimization level
  if (optimizationLevel === 'high') {
    sharpInstance = sharpInstance.sharpen({
      sigma: 1.2,
      m1: 0.5,
      m2: 0.5
    });
  } else if (optimizationLevel === 'medium') {
    sharpInstance = sharpInstance.sharpen();
  }
  
  // Choose output format based on extension
  const isPng = outputPath.toLowerCase().endsWith('.png');
  
  if (isPng) {
    sharpInstance = sharpInstance.png({ 
      compressionLevel: 9,
      palette: true
    });
  } else {
    sharpInstance = sharpInstance.jpeg({ 
      quality: outputQuality,
      mozjpeg: true,
      trellisQuantisation: true
    });
  }
  
  // Save the processed image
  await sharpInstance.toFile(outputPath);
  
  // Return the relative path from public directory
  return outputPath.replace(path.join(process.cwd(), 'public'), '');
}

// Process and save an image from a URL
export async function processAndSaveImage(
  imageUrl: string, 
  outputPath: string, 
  options: { 
    width?: number, 
    height?: number,
    quality?: number,
    optimizationLevel?: 'low' | 'medium' | 'high'
  } = {}
): Promise<string> {
  try {
    // Create parent directory if it doesn't exist
    await ensureDirectoryExists(path.dirname(outputPath));
    
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    const sharpInstance = sharp(Buffer.from(imageBuffer));
    
    // Use the common image processing function
    return processImage(sharpInstance, outputPath, options);
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

// Process a local attached asset
export async function processAttachedAsset(
  filePath: string, 
  outputDir: string, 
  filename: string, 
  options: {
    width?: number,
    height?: number,
    quality?: number,
    optimizationLevel?: 'low' | 'medium' | 'high'
  } = {}
): Promise<string> {
  try {
    // Ensure output directory exists
    await ensureDirectoryExists(outputDir);
    
    const outputPath = path.join(outputDir, filename);
    
    // Read the file - only once
    const imageBuffer = await readFileAsync(filePath);
    const sharpInstance = sharp(imageBuffer);
    
    // Use the common image processing function
    return processImage(sharpInstance, outputPath, options);
  } catch (error) {
    console.error('Error processing attached asset:', error);
    throw error;
  }
}