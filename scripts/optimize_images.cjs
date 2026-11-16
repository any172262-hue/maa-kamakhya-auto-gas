const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function optimizeImages() {
  const imagesDir = path.join(__dirname, '..', 'public', 'images');
  
  // 1. Convert maa-kamakhya-auto-gas-logo.png (277KB) to webp
  const logoInput = path.join(imagesDir, 'maa-kamakhya-auto-gas-logo.png');
  const logoWebp = path.join(imagesDir, 'maa-kamakhya-auto-gas-logo.webp');
  
  await sharp(logoInput)
    .webp({ quality: 90, alphaQuality: 95, effort: 6 })
    .toFile(logoWebp);
  
  const logoPngSize = fs.statSync(logoInput).size;
  const logoWebpSize = fs.statSync(logoWebp).size;
  console.log(`Logo: ${logoPngSize} bytes -> ${logoWebpSize} bytes (${((1 - logoWebpSize / logoPngSize) * 100).toFixed(1)}% reduction)`);

  // Copy to logo.webp as well
  fs.copyFileSync(logoWebp, path.join(imagesDir, 'logo.webp'));

  // 2. Check cng-installation.webp (841KB)
  const cngInput = path.join(imagesDir, 'cng-installation.jpg');
  const cngWebp = path.join(imagesDir, 'cng-installation.webp');
  
  const optimizedCng = path.join(imagesDir, 'cng-installation-optimized.webp');
  await sharp(cngInput)
    .webp({ quality: 80, effort: 6 })
    .toFile(optimizedCng);
    
  const cngOrigSize = fs.statSync(cngWebp).size;
  const cngOptSize = fs.statSync(optimizedCng).size;
  console.log(`CNG Diagram: ${cngOrigSize} bytes -> ${cngOptSize} bytes (${((1 - cngOptSize / cngOrigSize) * 100).toFixed(1)}% reduction)`);
  
  if (cngOptSize < cngOrigSize) {
    fs.copyFileSync(optimizedCng, cngWebp);
    fs.copyFileSync(optimizedCng, path.join(imagesDir, 'cng-installation-diagram.webp'));
    fs.unlinkSync(optimizedCng);
  }
}

optimizeImages().catch(console.error);
