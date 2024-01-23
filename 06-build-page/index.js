/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');
const destination = path.resolve(__dirname, 'project-dist');
//создание папки project-dist
async function mkdir(directory) {
  await fs.mkdir(directory, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
  });
}

mkdir(destination);
//создание index.html
const components = path.resolve(__dirname, 'components');
const outputHTML = fs.createWriteStream(
  path.resolve(destination, 'index.html'),
  'utf-8',
);
const componentsNew = new Object();
fs.readdir(components, function (err, files) {
  files.forEach((file) => {
    let stream = fs.createReadStream(path.resolve(components, file), 'utf-8');
    stream.on('data', (chunk) => {
      let fileInfo = path.resolve(components, file);
      const { ext } = path.parse(fileInfo);
      componentsNew[path.basename(file, ext)] = chunk;
    }),
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
    };
  });

  let streamTemplate = fs.createReadStream(
    path.resolve(__dirname, 'template.html'),
    'utf-8',
  );

  streamTemplate.on('data', (str) => {
    let result = '';
    while (str.search('{{') > 0 && str.search('}}') > str.search('{{')) {
      outputHTML.write(str.substring(0, str.search('{{')));

      result = str.substring(str.search('{{') + 2, str.search('}}'));

      outputHTML.write(String(componentsNew[result]));

      str = str.substring(str.search('}}') + 2, str.length);
    }

    outputHTML.write(str);
  });
});

//создание styles
const source = path.resolve(__dirname, 'styles');
const output = fs.createWriteStream(
  path.resolve(destination, 'style.css'),
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

// копирование assets
let sourceFonts = path.resolve(__dirname, 'assets', 'fonts');
let sourceImg = path.resolve(__dirname, 'assets', 'img');
let sourceSvg = path.resolve(__dirname, 'assets', 'svg');
let destinationCopy = path.resolve(__dirname, 'project-dist/assets');
let destinationFonts = path.resolve(__dirname, 'project-dist/assets/fonts');
let destinationImg = path.resolve(__dirname, 'project-dist/assets/img');
let destinationSvg = path.resolve(__dirname, 'project-dist/assets/svg');

//создание папок
(async function () {
  mkdir(destinationCopy);
  mkdir(destinationFonts);
  mkdir(destinationImg);
  mkdir(destinationSvg);
})();
//очистка
async function unlink(directory) {
  (files) => {
    files.forEach((file) => {
      fs.unlink(path.resolve(directory, file), (err) => {
        if (err) {
          console.error(err);
          return;
        }
      });
    });
  };
}
unlink(destinationFonts);
unlink(destinationImg);
unlink(destinationSvg);
//копирование
async function copyDir(directory, src) {
  await fs.readdir(src, function (err, files) {
    files.forEach((file) => {
      fs.copyFile(
        path.resolve(src, file),
        path.resolve(directory, file),
        (err) => {
          if (err) {
            console.error(err);
            return;
          }
        },
      );
    });
  });
}

copyDir(destinationImg, sourceImg);
copyDir(destinationSvg, sourceSvg);
copyDir(destinationFonts, sourceFonts);
