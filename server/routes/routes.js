const userRoutes = require('./users');

const formValuesRoutes = require('./formValues');

const talentApplicationsRoutes = require('./talentApplications');

const appRouter = (app, fs) => {
  // we add a default route here that handles empty routes athte base API url
  app.get('/', (req, res) => {
    res.send('welocme to my API');
  });

  // run our user route moudle here to complete the wire up
  userRoutes(app, fs);

  formValuesRoutes(app, fs);

  talentApplicationsRoutes(app, fs);
};

module.exports = appRouter;
