const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outZip = path.resolve('C:/Users/rd364/.gemini/antigravity/brain/e690d228-cb77-44d3-b120-3963ab7a4a38/maa-kamakhya-auto-gas-production-ready.zip');

const tempDir = path.join(rootDir, '.zip_temp', 'maa-kamakhya-auto-gas');
if (fs.existsSync(tempDir)) {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
fs.mkdirSync(tempDir, { recursive: true });

const itemsToCopy = [
  'src',
  'public',
  'dist',
  'docs',
  'scripts',
  'tests',
  '.github',
  'index.html',
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'test-suite.js',
  '.env.example',
  'README.md'
];

for (const item of itemsToCopy) {
  const src = path.join(rootDir, item);
  const dest = path.join(tempDir, item);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
  }
}

if (fs.existsSync(outZip)) {
  fs.unlinkSync(outZip);
}

const psCmd = `powershell -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${outZip}' -Force"`;
console.log('Zipping...');
execSync(psCmd, { stdio: 'inherit' });

fs.rmSync(path.join(rootDir, '.zip_temp'), { recursive: true, force: true });
console.log('Successfully created:', outZip);
