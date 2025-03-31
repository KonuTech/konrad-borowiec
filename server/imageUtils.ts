import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import fetch from 'node-fetch';

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);
const mkdirAsync = promisify(fs.mkdir);

// Ensure the public image directories exist
export async function ensureImageDirectories() {
  const projectImagesDir = path.join(process.cwd(), 'public', 'images', 'projects');
  const motorcycleImagesDir = path.join(process.cwd(), 'public', 'images', 'motorcycles');
  
  try {
    // Create base public directory if it doesn't exist
    if (!fs.existsSync(path.join(process.cwd(), 'public'))) {
      await mkdirAsync(path.join(process.cwd(), 'public'));
    }
    
    // Create images directory if it doesn't exist
    if (!fs.existsSync(path.join(process.cwd(), 'public', 'images'))) {
      await mkdirAsync(path.join(process.cwd(), 'public', 'images'));
    }
    
    // Create project images directory if it doesn't exist
    if (!fs.existsSync(projectImagesDir)) {
      await mkdirAsync(projectImagesDir);
    }
    
    // Create motorcycle images directory if it doesn't exist
    if (!fs.existsSync(motorcycleImagesDir)) {
      await mkdirAsync(motorcycleImagesDir);
    }
  } catch (error) {
    console.error('Error creating image directories:', error);
  }
}

// Process and save an image from a URL
export async function processAndSaveImage(imageUrl: string, outputPath: string, options: { 
  width?: number, 
  height?: number,
  quality?: number,
  optimizationLevel?: 'low' | 'medium' | 'high'
} = {}): Promise<string> {
  try {
    // Create directories if they don't exist
    await ensureImageDirectories();
    
    // Set default options
    const width = options.width || 800;
    const height = options.height;
    const quality = options.quality || 80;
    const optimizationLevel = options.optimizationLevel || 'medium';
    
    // Fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`);
    }
    
    const imageBuffer = await response.arrayBuffer();
    
    // Process the image with sharp
    let sharpInstance = sharp(Buffer.from(imageBuffer));
    
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
    
    // Apply optimization based on level
    let outputQuality = quality;
    switch(optimizationLevel) {
      case 'high':
        // High compression, smaller file size
        outputQuality = Math.min(quality, 60);
        // Add more aggressive sharpening
        sharpInstance = sharpInstance.sharpen({
          sigma: 1.2,
          m1: 0.5,
          m2: 0.5
        });
        break;
      case 'medium':
        // Balanced compression
        outputQuality = Math.min(quality, 75);
        // Add moderate sharpening
        sharpInstance = sharpInstance.sharpen();
        break;
      case 'low':
        // Light compression, higher quality
        outputQuality = quality;
        break;
    }
    
    // Choose output format based on extension
    if (outputPath.toLowerCase().endsWith('.png')) {
      sharpInstance = sharpInstance.png({ 
        compressionLevel: 9, // Maximum compression
        palette: true // Use palette-based quantization for smaller file sizes
      });
    } else {
      // Use mozjpeg-style optimization for JPEGs
      sharpInstance = sharpInstance.jpeg({ 
        quality: outputQuality,
        mozjpeg: true, // Use mozjpeg for better compression
        trellisQuantisation: true // Improve compression further
      });
    }
    
    // Save the processed image
    await sharpInstance.toFile(outputPath);
    
    // Return the relative path from public directory
    return outputPath.replace(path.join(process.cwd(), 'public'), '');
  } catch (error) {
    console.error('Error processing image:', error);
    throw error;
  }
}

// Process a local attached asset
export async function processAttachedAsset(filePath: string, outputDir: string, filename: string, options: {
  width?: number,
  height?: number,
  quality?: number,
  optimizationLevel?: 'low' | 'medium' | 'high'
} = {}): Promise<string> {
  try {
    // Create directories if they don't exist
    await ensureImageDirectories();
    
    // Set default options
    const width = options.width || 800;
    const height = options.height;
    const quality = options.quality || 80;
    const optimizationLevel = options.optimizationLevel || 'medium';
    
    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      await mkdirAsync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, filename);
    
    // Read the file
    const imageBuffer = await readFileAsync(filePath);
    
    // Process the image with sharp
    let sharpInstance = sharp(imageBuffer);
    
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
    
    // Apply optimization based on level
    let outputQuality = quality;
    switch(optimizationLevel) {
      case 'high':
        // High compression, smaller file size
        outputQuality = Math.min(quality, 60);
        // Add more aggressive sharpening
        sharpInstance = sharpInstance.sharpen({
          sigma: 1.2,
          m1: 0.5,
          m2: 0.5
        });
        break;
      case 'medium':
        // Balanced compression
        outputQuality = Math.min(quality, 75);
        // Add moderate sharpening
        sharpInstance = sharpInstance.sharpen();
        break;
      case 'low':
        // Light compression, higher quality
        outputQuality = quality;
        break;
    }
    
    // Choose output format based on extension
    if (filename.toLowerCase().endsWith('.png')) {
      sharpInstance = sharpInstance.png({ 
        compressionLevel: 9, // Maximum compression
        palette: true // Use palette-based quantization for smaller file sizes
      });
    } else {
      // Use mozjpeg-style optimization for JPEGs
      sharpInstance = sharpInstance.jpeg({ 
        quality: outputQuality,
        mozjpeg: true, // Use mozjpeg for better compression
        trellisQuantisation: true // Improve compression further
      });
    }
    
    // Save the processed image
    await sharpInstance.toFile(outputPath);
    
    // Return the relative path from public directory
    return outputPath.replace(path.join(process.cwd(), 'public'), '');
  } catch (error) {
    console.error('Error processing attached asset:', error);
    throw error;
  }
}