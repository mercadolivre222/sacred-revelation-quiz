import fs from 'fs';
import path from 'path';

function copyFolderSync(from, to) {
  if (!fs.existsSync(to)) {
    fs.mkdirSync(to, { recursive: true });
  }
  fs.readdirSync(from).forEach(element => {
    const fromPath = path.join(from, element);
    const toPath = path.join(to, element);
    if (fs.lstatSync(fromPath).isDirectory()) {
      copyFolderSync(fromPath, toPath);
    } else {
      fs.copyFileSync(fromPath, toPath);
    }
  });
}

try {
  // Ensure dist exists
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist', { recursive: true });
  }

  // Copy dist/client contents to dist if they exist
  if (fs.existsSync('dist/client')) {
    console.log('Copying static assets from dist/client to dist for Vercel...');
    copyFolderSync('dist/client', 'dist');
  }

  // Copy root index.html to dist/index.html to guarantee SPA/Static Vercel serving works flawlessly
  if (fs.existsSync('index.html')) {
    console.log('Copying root index.html to dist/index.html...');
    fs.copyFileSync('index.html', 'dist/index.html');
  }

  // Copy root images to dist/
  ['salomon_coin.png', 'coin.jpg', 'salomon_padlock.png'].forEach(img => {
    if (fs.existsSync(img)) {
      console.log(`Copying ${img} to dist/...`);
      fs.copyFileSync(img, path.join('dist', img));
    }
  });

  console.log('Vercel postbuild synchronization completed successfully!');
} catch (err) {
  console.error('Error during postbuild copy:', err);
}
