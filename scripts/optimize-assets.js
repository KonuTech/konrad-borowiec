import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ASSETS_DIR = path.join(process.cwd(), 'assets');
const PICTURES_DIR = path.join(ASSETS_DIR, 'pictures');

async function optimizeImage(inputPath, outputPath, options = {}) {
  const { width, quality = 85, format = 'jpeg' } = options;

  try {
    let image = sharp(inputPath);

    if (width) {
      image = image.resize(width, null, { withoutEnlargement: true });
    }

    if (format === 'webp') {
      image = image.webp({ quality });
    } else {
      image = image.jpeg({ quality, progressive: true });
    }

    await image.toFile(outputPath);
    console.log(`Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`);
  } catch (error) {
    console.error(`Error optimizing ${inputPath}:`, error.message);
  }
}

async function processDirectory(dir, relativePath = '') {
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      await processDirectory(fullPath, path.join(relativePath, item));
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      const ext = path.extname(item).toLowerCase();
      const baseName = path.basename(item, ext);
      const originalSize = stat.size;

      if (originalSize > 100 * 1024) {
        const optimizedPath = path.join(dir, `${baseName}_opt${ext}`);

        if (!fs.existsSync(optimizedPath)) {
          await optimizeImage(fullPath, optimizedPath, {
            quality: originalSize > 1024 * 1024 ? 75 : 85,
            width: originalSize > 2 * 1024 * 1024 ? 1920 : undefined
          });

          const optimizedSize = fs.statSync(optimizedPath).size;
          const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
          console.log(`  Reduced by ${reduction}% (${(originalSize/1024).toFixed(1)}KB -> ${(optimizedSize/1024).toFixed(1)}KB)`);
        }
      }
    }
  }
}

async function main() {
  console.log('Starting image optimization...');
  console.log(`Processing directory: ${PICTURES_DIR}`);

  if (!fs.existsSync(PICTURES_DIR)) {
    console.log('Pictures directory not found, skipping optimization');
    return;
  }

  await processDirectory(PICTURES_DIR);
  console.log('Image optimization complete!');
}

// Check if this is the main module (ES module equivalent)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { optimizeImage };