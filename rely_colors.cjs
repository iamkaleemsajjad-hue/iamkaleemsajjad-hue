const fs = require('fs');
const path = require('path');

function hexToRgb(hex) {
  let r = 0, g = 0, b = 0;
  if (hex.length == 7) {
    r = parseInt(hex.slice(1, 3), 16);
    g = parseInt(hex.slice(3, 5), 16);
    b = parseInt(hex.slice(5, 7), 16);
  }
  return `${r}, ${g}, ${b}`;
}

const colors = {
  deep: '#0B1F1A',
  card: '#123F35',
  accent: '#00FFA3'
};

const deepRgb = hexToRgb(colors.deep);
const cardRgb = hexToRgb(colors.card);
const accentRgb = hexToRgb(colors.accent);

function updateIndexCss(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace primary tokens with accent green
  content = content.replace(/--primary: #087C9F;/g, `--primary: ${colors.accent};`);
  content = content.replace(/--primary-rgb: 8, 124, 159;/g, `--primary-rgb: ${accentRgb};`);
  
  // Replace secondary/action tokens with card green
  content = content.replace(/--secondary: #2C3E50;/g, `--secondary: ${colors.card};`);
  content = content.replace(/--secondary-rgb: 44, 62, 80;/g, `--secondary-rgb: ${cardRgb};`);
  
  // Replace accent tokens
  content = content.replace(/--accent: #C1E0F8;/g, `--accent: ${colors.accent};`);
  content = content.replace(/--accent-rgb: 193, 224, 248;/g, `--accent-rgb: ${accentRgb};`);
  
  // Replace backgrounds
  content = content.replace(/--bg-deep: #F2F4F5;/g, `--bg-deep: ${colors.deep};`);
  content = content.replace(/--bg-card: #FFFFFF;/g, `--bg-card: ${colors.card};`);
  content = content.replace(/--bg-card-hover: #FAFBFC;/g, `--bg-card-hover: #1A5447;`);
  content = content.replace(/--bg-surface: #E8ECEE;/g, `--bg-surface: ${colors.deep};`);
  content = content.replace(/--bg-overlay: rgba\(242, 244, 245, 0\.85\);/g, `--bg-overlay: rgba(${deepRgb}, 0.85);`);
  
  // Grid / Borders
  content = content.replace(/--grid: #DDE2E5;/g, `--grid: rgba(${accentRgb}, 0.15);`);
  content = content.replace(/--border: #DDE2E5;/g, `--border: rgba(${accentRgb}, 0.2);`);
  content = content.replace(/--border-hover: rgba\(8, 124, 159, 0\.3\);/g, `--border-hover: rgba(${accentRgb}, 0.5);`);
  
  // Text (revert to dark theme appropriate text colors)
  content = content.replace(/--text-primary: #2C3E50;/g, `--text-primary: #FFFFFF;`);
  content = content.replace(/--text-secondary: #7F8C8D;/g, `--text-secondary: rgba(255, 255, 255, 0.7);`);
  content = content.replace(/--text-muted: #95a5a6;/g, `--text-muted: rgba(255, 255, 255, 0.5);`);
  content = content.replace(/--text-accent: #087C9F;/g, `--text-accent: ${colors.accent};`);

  // Info color
  content = content.replace(/--info: #087C9F;/g, `--info: ${colors.accent};`);

  // Hardcoded RGB values from earlier in index.css (e.g. 127, 140, 141)
  content = content.replace(/rgba\(127, 140, 141, 0\.1\)/g, `rgba(${accentRgb}, 0.1)`);
  content = content.replace(/rgba\(127, 140, 141, 0\.15\)/g, `rgba(${accentRgb}, 0.15)`);
  content = content.replace(/rgba\(127, 140, 141, 0\.2\)/g, `rgba(${accentRgb}, 0.2)`);
  content = content.replace(/rgba\(44, 62, 80,/g, `rgba(${cardRgb},`);
  content = content.replace(/rgba\(8, 124, 159,/g, `rgba(${accentRgb},`);

  // Update hover backgrounds that were set to white with 0.1 opacity -> change to accent with 0.1
  content = content.replace(/rgba\(255, 255, 255, 0\.1\)/g, `rgba(${accentRgb}, 0.1)`);

  fs.writeFileSync(filePath, content, 'utf8');
}

function updatePagesCss(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace references
  content = content.replace(/rgba\(127, 140, 141, /g, `rgba(${accentRgb}, `);
  content = content.replace(/rgba\(8, 124, 159,/g, `rgba(${accentRgb},`);
  content = content.replace(/rgba\(44, 62, 80,/g, `rgba(${cardRgb},`);
  
  // Handle header toggle button hovers which were white previously
  content = content.replace(/rgba\(255, 255, 255, 0\.1\)/g, `rgba(${accentRgb}, 0.1)`);

  // Sidebar background (give it same color as header - which is --secondary)
  content = content.replace(/background: var\(--bg-card\);/g, `background: var(--secondary);`);

  fs.writeFileSync(filePath, content, 'utf8');
}

function updateLogoFiles(logoJsPath, indexHtmlPath) {
  // Update logo.js
  let logoContent = fs.readFileSync(logoJsPath, 'utf8');
  // the right pillar was #087C9F -> now we want it to be accent
  logoContent = logoContent.replace(/fill="#087C9F"/g, `fill="${colors.accent}"`);
  // gradient origin
  logoContent = logoContent.replace(/stop-color="#087C9F"/g, `stop-color="${colors.card}"`);
  // gradient destin
  logoContent = logoContent.replace(/stop-color="#C1E0F8"/g, `stop-color="${colors.accent}"`);
  // drop shadow
  logoContent = logoContent.replace(/flood-color="#2C3E50"/g, `flood-color="${colors.deep}"`);
  // left pillar
  logoContent = logoContent.replace(/fill="#2C3E50"/g, `fill="${colors.deep}"`);
  fs.writeFileSync(logoJsPath, logoContent, 'utf8');

  // Update index.html
  let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  indexContent = indexContent.replace(/fill="#087C9F"/g, `fill="${colors.accent}"`);
  indexContent = indexContent.replace(/stop-color="#087C9F"/g, `stop-color="${colors.card}"`);
  indexContent = indexContent.replace(/stop-color="#C1E0F8"/g, `stop-color="${colors.accent}"`);
  indexContent = indexContent.replace(/flood-color="#2C3E50"/g, `flood-color="${colors.deep}"`);
  indexContent = indexContent.replace(/fill="#2C3E50"/g, `fill="${colors.deep}"`);

  // fix theme color
  indexContent = indexContent.replace(/<meta name="theme-color" content="#040B14" \/>/, `<meta name="theme-color" content="${colors.deep}" \/>`);
  
  fs.writeFileSync(indexHtmlPath, indexContent, 'utf8');
}

const basePath = path.join('c:', 'Users', 'pc', 'Desktop', 'NUST NEXUS');
updateIndexCss(path.join(basePath, 'src', 'styles', 'index.css'));
updatePagesCss(path.join(basePath, 'src', 'styles', 'pages.css'));
updateLogoFiles(
  path.join(basePath, 'src', 'components', 'logo.js'),
  path.join(basePath, 'index.html')
);

console.log("Colors updated to 3-color neon theme");
