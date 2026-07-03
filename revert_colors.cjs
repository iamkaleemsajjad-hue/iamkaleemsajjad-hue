const fs = require('fs');
const path = require('path');

function updateIndexCss(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace primary tokens with original
  content = content.replace(/--primary: #00FFA3;/g, `--primary: #087C9F;`);
  content = content.replace(/--primary-rgb: 0, 255, 163;/g, `--primary-rgb: 8, 124, 159;`);
  
  // Replace secondary/action tokens
  content = content.replace(/--secondary: #123F35;/g, `--secondary: #2C3E50;`);
  content = content.replace(/--secondary-rgb: 18, 63, 53;/g, `--secondary-rgb: 44, 62, 80;`);
  
  // Replace accent tokens
  content = content.replace(/--accent: #00FFA3;/g, `--accent: #C1E0F8;`);
  content = content.replace(/--accent-rgb: 0, 255, 163;/g, `--accent-rgb: 193, 224, 248;`);
  
  // Replace backgrounds
  content = content.replace(/--bg-deep: #0B1F1A;/g, `--bg-deep: #F2F4F5;`);
  content = content.replace(/--bg-card: #123F35;/g, `--bg-card: #FFFFFF;`);
  content = content.replace(/--bg-card-hover: #1A5447;/g, `--bg-card-hover: #FAFBFC;`);
  content = content.replace(/--bg-surface: #0B1F1A;/g, `--bg-surface: #E8ECEE;`);
  content = content.replace(/--bg-overlay: rgba\(11, 31, 26, 0\.85\);/g, `--bg-overlay: rgba(242, 244, 245, 0.85);`);
  
  // Grid / Borders
  content = content.replace(/--grid: rgba\(0, 255, 163, 0\.15\);/g, `--grid: #DDE2E5;`);
  content = content.replace(/--border: rgba\(0, 255, 163, 0\.2\);/g, `--border: #DDE2E5;`);
  content = content.replace(/--border-hover: rgba\(0, 255, 163, 0\.5\);/g, `--border-hover: rgba(8, 124, 159, 0.3);`);
  
  // Text 
  content = content.replace(/--text-primary: #FFFFFF;/g, `--text-primary: #2C3E50;`);
  content = content.replace(/--text-secondary: rgba\(255, 255, 255, 0\.7\);/g, `--text-secondary: #7F8C8D;`);
  content = content.replace(/--text-muted: rgba\(255, 255, 255, 0\.5\);/g, `--text-muted: #95a5a6;`);
  content = content.replace(/--text-accent: #00FFA3;/g, `--text-accent: #087C9F;`);

  // Info color
  content = content.replace(/--info: #00FFA3;/g, `--info: #087C9F;`);

  // Hardcoded RGB values 
  content = content.replace(/rgba\(0, 255, 163, 0\.1\)/g, `rgba(127, 140, 141, 0.1)`);
  content = content.replace(/rgba\(0, 255, 163, 0\.15\)/g, `rgba(127, 140, 141, 0.15)`);
  content = content.replace(/rgba\(0, 255, 163, 0\.2\)/g, `rgba(127, 140, 141, 0.2)`);
  content = content.replace(/rgba\(18, 63, 53,/g, `rgba(44, 62, 80,`);
  content = content.replace(/rgba\(0, 255, 163,/g, `rgba(8, 124, 159,`);

  fs.writeFileSync(filePath, content, 'utf8');
}

function updatePagesCss(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace references
  content = content.replace(/rgba\(0, 255, 163, /g, `rgba(127, 140, 141, `);
  content = content.replace(/rgba\(0, 255, 163,/g, `rgba(8, 124, 159,`);
  content = content.replace(/rgba\(18, 63, 53,/g, `rgba(44, 62, 80,`);
  
  // Handled header toggle button hovers which were white previously
  content = content.replace(/rgba\(0, 255, 163, 0\.1\)/g, `rgba(255, 255, 255, 0.1)`);

  fs.writeFileSync(filePath, content, 'utf8');
}

function updateLogoFiles(logoJsPath, indexHtmlPath) {
  // Update logo.js
  let logoContent = fs.readFileSync(logoJsPath, 'utf8');
  logoContent = logoContent.replace(/fill="#00FFA3"/g, `fill="#087C9F"`);
  logoContent = logoContent.replace(/stop-color="#123F35"/g, `stop-color="#087C9F"`);
  logoContent = logoContent.replace(/stop-color="#00FFA3"/g, `stop-color="#C1E0F8"`);
  logoContent = logoContent.replace(/flood-color="#0B1F1A"/g, `flood-color="#2C3E50"`);
  logoContent = logoContent.replace(/fill="#0B1F1A"/g, `fill="#2C3E50"`);
  fs.writeFileSync(logoJsPath, logoContent, 'utf8');

  // Update index.html
  let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  indexContent = indexContent.replace(/fill="#00FFA3"/g, `fill="#087C9F"`);
  indexContent = indexContent.replace(/stop-color="#123F35"/g, `stop-color="#087C9F"`);
  indexContent = indexContent.replace(/stop-color="#00FFA3"/g, `stop-color="#C1E0F8"`);
  indexContent = indexContent.replace(/flood-color="#0B1F1A"/g, `flood-color="#2C3E50"`);
  indexContent = indexContent.replace(/fill="#0B1F1A"/g, `fill="#2C3E50"`);

  // fix theme color
  indexContent = indexContent.replace(/<meta name="theme-color" content="#0B1F1A" \/>/, `<meta name="theme-color" content="#F2F4F5" \/>`);
  
  fs.writeFileSync(indexHtmlPath, indexContent, 'utf8');
}

const basePath = path.join('c:', 'Users', 'pc', 'Desktop', 'NUST NEXUS');
updateIndexCss(path.join(basePath, 'src', 'styles', 'index.css'));
updatePagesCss(path.join(basePath, 'src', 'styles', 'pages.css'));
updateLogoFiles(
  path.join(basePath, 'src', 'components', 'logo.js'),
  path.join(basePath, 'index.html')
);

console.log("Colors reverted to previous corporate palette");
