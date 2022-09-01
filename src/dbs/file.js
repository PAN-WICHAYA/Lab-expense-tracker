const { readFile, writeFile } = require('fs/promises');

exports.readCategory = () =>
  readFile('src/dbs/category.json', 'utf-8').then((res) => JSON.parse(res));

exports.writeCategory = (data) => {
  writeFile('src/dbs/category.json', JSON.stringify(data), 'utf-8');
  console.log('write file done');
};

exports.readTransaction = () =>
  readFile('src/dbs/transaction.json', 'utf-8').then((res) => JSON.parse(res));

exports.writeTransaction = (data) =>
  writeFile('src/dbs/transaction.json', JSON.stringify(data), 'utf-8');
