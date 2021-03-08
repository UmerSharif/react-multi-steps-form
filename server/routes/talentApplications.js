const path = require('path');
const utils = require('../common/utils');
const url = require('url');
const uuidV4 = require('uuid');

var formidable = require('formidable'),
  util = require('util');

const dataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'talentApplications.json'
);

const talentApplications = (app, fs) => {
  const writeFile = (
    fileData,
    callback,
    filePath = dataPath,
    encoding = 'utf8'
  ) => {
    fs.writeFile(filePath, fileData, encoding, (err) => {
      if (err) {
        throw err;
      }
      callback();
    });
  };

  app.get('/application_forms/talent_applications', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const uuid = queryObject.uuid;

    utils.readFile((data) => {
      let index = data.findIndex((obj) => obj.uuid === uuid);
      res.send({ talentApplication: data[index] });
    }, true);
  });

  app.post('/application_forms/talent_applications', (req, res) => {
    // https://nodejs.org/en/knowledge/HTTP/servers/how-to-handle-multipart-form-data/

    var form = new formidable.IncomingForm();

    // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.
    form.parse(req, function (err, fields, files) {
      if (err) {
        // Check for and handle any errors here.
        console.error(err.message);
        return;
      }

      let formData = {
        firstName: fields['firstName'],
        lastName: fields['lastName'],
        gender: fields['gender'],
        phone: fields['phone'],
        email: fields['email'],
        streetAddress: fields['streetAddress'],
        streetAddress2: fields['streetAddress2'],
        suburb: { id: 7053, name: 'KIN KIN', state: 'QLD', postcode: '4571' },
        dateOfBirth: fields['dateOfBirth'],
      };

      utils.readFile((data) => {
        let index;
        let thisForm;

        // this is a new application
        thisForm = {
          ...formData,
          id: utils.getMaxId(data) + 1,
          uuid: uuidV4.v4(),
          statue: 'Incompelete',
        };

        data.push(thisForm);

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(201).send({
            talentApplication: thisForm,
          });
        });
      }, true);
    });
  });

  app.patch('/application_forms/talent_applications', (req, res) => {
    const queryObject = url.parse(req.url, true).query;
    const uuid = queryObject.uuid;
    const email = queryObject.email;

    utils.readFile((data) => {
      const newDataObj = req.body;

      // find the object with uuid=== this uuid
      let index = data.findIndex((obj) => obj.uuid === uuid);
      let thisForm = data[index];

      if (req.is('multipart/form-data')) {
        let form = new formidable.IncomingForm({
          multiples: false,
          uploadDir: __dirname + '/../data/upload',
          keepExtensions: true,
        });

        // form.parse analyzes the incoming stream data, picking apart the different fields and files for you.
        form.parse(req, function (err, fields, files) {
          if (err) {
            // Check for and handle any errors here.
            console.error(err.message);
            return;
          }

          let formData = {};

          // Personal Details
          if (fields['firstName']) {
            formData = {
              firstName: fields['firstName'],
              lastName: fields['lastName'],
              gender: fields['gender'],
              phone: fields['phone'],
              email: fields['email'],
              streetAddress: fields['streetAddress'],
              streetAddress2: fields['streetAddress2'],
              suburb: {
                id: 7053,
                name: 'KIN KIN',
                state: 'QLD',
                postcode: '4571',
              },
              dateOfBirth: fields['dateOfBirth'],
            };
          }

          // upload a photo
          if (files['photo']) {
            let filePath = files['photo'].path;
            let lastIndex = filePath.lastIndexOf('/');

            let fileUrl = utils.serverURL.concat(
              '/upload/',
              filePath.substring(lastIndex)
            );

            formData = {
              photo: fileUrl,
            };
          }

          // upload a video
          if (files['video']) {
            let filePath = files['video'].path;
            let lastIndex = filePath.lastIndexOf('/');

            let fileUrl = utils.serverURL.concat(
              '/upload/',
              filePath.substring(lastIndex)
            );

            formData = {
              video: fileUrl,
            };
          }

          // Cannot upload a photo reason
          if (fields['noPhoto']) {
            formData = {
              noPhoto: fields['noPhoto'],
            };
          }

          // cannot upload a video reason
          if (fields['noVideo']) {
            formData = {
              noPhoto: fields['noVideo'],
            };
          }

          thisForm = { ...thisForm, ...formData };

          data[index] = thisForm;

          writeFile(JSON.stringify(data, null, 2), () => {
            res.status(200).send({
              talentApplication: thisForm,
            });
          });
        });
      } else if (req.is('application/json')) {
        for (const property in newDataObj) {
          switch (property) {
            case 'skillIds':
              thisForm = {
                ...thisForm,
                skills: utils.convertIdsToObject(newDataObj[property]),
              };
              break;
            case 'certificateIds':
              thisForm = {
                ...thisForm,
                certificates: utils.convertIdsToObject(newDataObj[property]),
              };
              break;
            default:
              thisForm = { ...thisForm, [property]: newDataObj[property] };
          }
        }

        data[index] = thisForm;

        writeFile(JSON.stringify(data, null, 2), () => {
          res.status(200).send({
            talentApplication: thisForm,
          });
        });
      }
    }, true);
  });
};

module.exports = talentApplications;
