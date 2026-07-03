const fs = require('fs');
const path = require('path');

function replaceColorsInFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Replace the cyberpunk blue with new primary color (#087C9F -> RGB: 8, 124, 159)
  content = content.replace(/rgba\(0, 204, 255,/g, 'rgba(8, 124, 159,');
  
  // Replace dark grey bg colors
  content = content.replace(/rgba\(30, 41, 59, 0\.5\)/g, 'rgba(127, 140, 141, 0.1)');
  content = content.replace(/rgba\(30, 41, 59, 0\.6\)/g, 'rgba(127, 140, 141, 0.15)');
  content = content.replace(/rgba\(30, 41, 59, 0\.8\)/g, 'rgba(127, 140, 141, 0.2)');
  
  // Replace subtle white borders with subtle dark borders for light theme
  content = content.replace(/rgba\(255, 255, 255, 0\.05\)/g, 'rgba(44, 62, 80, 0.05)');
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated ${filePath}`);
}

const stylesDir = path.join('c:', 'Users', 'pc', 'Desktop', 'NUST NEXUS', 'src', 'styles');
replaceColorsInFile(path.join(stylesDir, 'index.css'));
replaceColorsInFile(path.join(stylesDir, 'pages.css'));
