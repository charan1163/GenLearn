const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('Building React app...');

  execSync('cd client && npm run build', { stdio: 'inherit' });
execSync('npm run build', { stdio: 'inherit', cwd: 'client' });

console.log('Copying built files to root...');

// Copy dist contents to root
const distPath = path.join(__dirname, 'client', 'dist');
const rootPath = __dirname;

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// Copy all files from dist to root
copyDir(distPath, rootPath);

console.log('Build and copy completed!');
console.log('You can now commit and push these files to GitHub.'); 