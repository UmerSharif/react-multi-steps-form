const path = require('path');
const fs = require('fs');

const dataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'talentApplications.json'
);

const serverURL = 'http://localhost:3030';

const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = 'utf8'
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      throw err;
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const getMaxId = (arr) => {
  return arr.reduce((acc, item) => {
    if (item.id > acc) acc = item.id;

    return acc;
  }, 0);
};

const convertIdsToObject = (arr) => {
  return arr.reduce((acc, item) => {
    acc.push({ id: item });
    return acc;
  }, []);
};

exports.serverURL = serverURL;

exports.readFile = readFile;

exports.getMaxId = getMaxId;

exports.convertIdsToObject = convertIdsToObject;
