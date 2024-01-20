const fs = require('fs');
const path = require('path');
const thispath = path.join(__dirname, 'secret-folder');
fs.readdir(thispath, (err, files) => {
  for (let item of files) {
    fs.stat(path.join(thispath, item), (err, files) => {
      if (files.isFile()) {
        console.log(
          `\n< Имя файла: ${item.split('.')[0]} >-< Расширение файла: ${
            item.split('.')[1]
          } >-< Вес файла: ${files['size']} >`,
        );
      }
    });
  }
});
