const fs = require('fs');
const path = require('path');

const source = path.resolve(__dirname, 'styles');
const destination = path.resolve(__dirname, 'project-dist');

const output = fs.createWriteStream(
  path.resolve(destination, 'bundle.css'),
  'utf-8',
);

fs.readdir(source, function (err, files) {
  files.forEach((file) => {
    let fileInfo = path.resolve(source, file);
    const { ext } = path.parse(fileInfo);

    if (ext.slice(1) === 'css') {
      let stream = fs.createReadStream(fileInfo, 'utf-8');

      stream.on(
        'data',
        (chunk) => output.write(chunk),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        },
      );
    }
  });
});
