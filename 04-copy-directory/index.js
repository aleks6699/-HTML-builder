const fs = require('fs');
const path = require('path');

const thisPath = path.join(__dirname, 'files');
const copyPath = path.join(__dirname, 'files-copy');

// создание папки.
fs.mkdir(copyPath, { recursive: true }, (err) => {
  if (err) {
    console.error(err);
    return;
  }
});

fs.readdir(copyPath, function (err, files) {
  //очистка
  files.forEach((file) => {
    fs.unlink(path.join(copyPath, file), (err) => {
      if (err) {
        console.error(err);
        return;
      }
    });
  });
  //копирование
  fs.readdir(thisPath, function (err, files) {
    files.forEach((file) => {
      fs.copyFile(
        path.resolve(thisPath, file),
        path.resolve(copyPath, file),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        },
      );
    });
  });
});
