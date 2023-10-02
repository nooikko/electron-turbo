const fs = require('fs'); // eslint-disable-line
const path = require('path'); // eslint-disable-line

const updateHtmlPaths = (htmlFilePath) => {
  const htmlContent = fs.readFileSync(htmlFilePath, 'utf8');
  const updatedContent = htmlContent.replace(
    /\/_next\//g, // Regular expression to match '/_next/' preceded by whitespace
    '_next/', // Replacement string, ' _next/' with a space at the beginning
  );
  fs.writeFileSync(htmlFilePath, updatedContent, 'utf8');
};

const htmlFilePath = path.resolve(__dirname, '../dist/web/index.html');
updateHtmlPaths(htmlFilePath);
