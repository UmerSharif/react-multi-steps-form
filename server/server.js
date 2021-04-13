// load up the express framework and body-parser helper
const express = require('express');
const bodyParser = require('body-parser');

// create an instance of express to server our end points
const app = express();

// load up node's build in file system helper library there
// we'll be using this later to server our JSON files
const fs = require('fs');

app.use((req, res, next) => {
  // Website you wish to allow to connect, e.g http://localhost:3000
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  );

  // Request headers you wish to allow
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-Requested-With,content-type'
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

app.use('/upload', express.static(__dirname + '/data/upload'));

// configure our express instance with some body-parser settings
// including handling JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// this is where we will handle our various routes from
const routes = require('./routes/routes.js')(app, fs);

// finally launch our server on port 3030
const server = app.listen(3030, () => {
  console.log('path=', process.mainModule.filename);
  console.log('listening on port %s...', server.address().port);
});
