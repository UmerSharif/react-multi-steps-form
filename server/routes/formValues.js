const path = require('path');

const formValuesRoutes = (app, fs) => {
  const dataPath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'formValues.json'
  );

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

  app.get('/application_forms/talent_applications/form_values', (req, res) => {
    readFile((data) => {
      res.send(data);
    }, true);
  });
};

module.exports = formValuesRoutes;
