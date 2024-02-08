const fs = require('fs');
const config = require('./config');

function generateRandomLine() {
  return Math.random().toString(36).substring(2);
}

function generateFile({ inputFilePath: filePath = 'inputFile.txt', numLines = 10000 }) {
  const lines = [];

  for (let i = 0; i < numLines; i++) {
    lines.push(generateRandomLine());
  }

  const fileContent = lines.join('\n');
  fs.writeFileSync(filePath, fileContent, 'utf-8');

  console.log(`Generated large file with ${numLines} lines at ${filePath}`);
}

generateFile(config);