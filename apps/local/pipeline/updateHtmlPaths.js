const fs = require('fs');  // eslint-disable-line
const path = require('path');  // eslint-disable-line

const updatePaths = (filePath) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  // Replacing a leading forward slash that follows a quote
  const updatedContent = fileContent.replace(/(["'])\/([^\/])/g, '$1$2');
  fs.writeFileSync(filePath, updatedContent, 'utf8');
};

const searchAndUpdateInDirectory = (directory) => {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      searchAndUpdateInDirectory(filePath);
    } else if (fs.readFileSync(filePath, 'utf8').match(/(["'])\/([^\/])/)) {
      updatePaths(filePath);
    }
  }
};

const distPath = path.resolve(__dirname, '../dist/app');  // eslint-disable-line
searchAndUpdateInDirectory(distPath);
