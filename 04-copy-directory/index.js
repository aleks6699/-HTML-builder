const fs = require('fs');
const path = require('path');

const thispath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

fs.stat(copyPath, (err) => {
  if (err) {
    fs.mkdir('./04-copy-directory/files-copy', (err) => err);
  } else {
    fs.rmdir('./04-copy-directory/files-copy', (err) => err);
    fs.mkdir('./04-copy-directory/files-copy', (err) => err);
  }
});

fs.readdir(thispath, (err, files) => {
  for (let item of files) {
    fs.copyFile(
      `./04-copy-directory/files/${item}`,
      `./04-copy-directory/files-copy/${item}`,
      (err) => {
        if (err) throw err;
      },
    );
  }
});
