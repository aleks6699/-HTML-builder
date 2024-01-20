const fs = require('fs');
const path = require('path');

const thispath = path.join(__dirname, 'styles');
const copyPath = path.join(__dirname, '\\project-dist\\bundle.css');

async function makeBundle() {
  await fs.promises.writeFile(copyPath, '');
  let readStyle = await fs.promises.readdir(thispath);
  let readBundle = await fs.promises.readFile(copyPath);

  if (readStyle.length == 4) {
    [readStyle[0], readStyle[1], readStyle[3]] = [
      readStyle[1],
      readStyle[3],
      readStyle[0],
    ];
  }
  for await (let item of readStyle) {
    if (item.split('.')[1] === 'css') {
      let styleText = await fs.promises.readFile(
        `${thispath}\\${item}`,
        'utf-8',
      );

      readBundle += '\n' + styleText;
    }
  }

  await fs.promises.writeFile(copyPath, readBundle);
}

makeBundle();

console.log('\nbundle.css complet.\n');
