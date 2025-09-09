#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'client', 'build');
const staticPath = path.join(buildPath, 'static');
const jsPath = path.join(staticPath, 'js');
const cssPath = path.join(staticPath, 'css');

console.log('🔍 Verifying build files...');
console.log('Build path:', buildPath);

if (!fs.existsSync(buildPath)) {
  console.error('❌ Build directory does not exist!');
  process.exit(1);
}

if (!fs.existsSync(staticPath)) {
  console.error('❌ Static directory does not exist!');
  console.log('📁 Build directory contents:');
  fs.readdirSync(buildPath).forEach(file => {
    console.log(`  - ${file}`);
  });
  process.exit(1);
}

if (!fs.existsSync(jsPath)) {
  console.error('❌ JS directory does not exist!');
  process.exit(1);
}

if (!fs.existsSync(cssPath)) {
  console.error('❌ CSS directory does not exist!');
  process.exit(1);
}

const jsFiles = fs.readdirSync(jsPath);
const cssFiles = fs.readdirSync(cssPath);

console.log('✅ Build verification successful!');
console.log(`📄 JS files: ${jsFiles.join(', ')}`);
console.log(`🎨 CSS files: ${cssFiles.join(', ')}`);

// Verify main files exist
const hasMainJs = jsFiles.some(file => file.startsWith('main.') && file.endsWith('.js'));
const hasMainCss = cssFiles.some(file => file.startsWith('main.') && file.endsWith('.css'));

if (!hasMainJs) {
  console.error('❌ Main JS file not found!');
  process.exit(1);
}

if (!hasMainCss) {
  console.error('❌ Main CSS file not found!');
  process.exit(1);
}

console.log('🎉 All required build files are present!');
