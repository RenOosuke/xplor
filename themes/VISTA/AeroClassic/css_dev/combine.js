const fs = require('fs');
const path = require('path');

const cssFiles = [
    'AppBorder',
    'WindowDragBar',
    'WrappedApp',
    'CommandBar',
    'Menu',
    'NavigationPane'
].map(a => `${a}`); // Replace with actual file names

const currentDir = __dirname;
const parentDir = path.resolve(currentDir, '..');
const outputFilePath = path.join(parentDir, 'theme.css');

let combinedCSS = '';

cssFiles.forEach(file => {
    const filePath = path.join(currentDir, `CSS\\${file}.css`);
    if (fs.existsSync(filePath)) {
        combinedCSS += `/* ${file} */\n` + fs.readFileSync(filePath, 'utf8') + '\n\n';
    } else {
        console.warn(`Warning: ${file} not found!`);
    }
});

fs.writeFileSync(outputFilePath, combinedCSS, 'utf8');
console.log(`Combined CSS file created: ${outputFilePath}`);
