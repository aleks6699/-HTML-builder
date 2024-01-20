const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'text.txt');

let writeStream = fs.createWriteStream(filePath);
const { stdin, stdout } = process;
const exitNotification = () => {
  stdout.write('До свидания!');
  process.exit();
};

stdout.write('Пожалуйста, введите текст\n');

stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') {
    exitNotification();
  }
  writeStream.write(data);
});

process.on('SIGINT', exitNotification);
