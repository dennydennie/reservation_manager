// Initializes the `reservations` service on path `/reservations`
const { Reservations } = require('./reservations.class');
const createModel = require('../../models/reservations.model');
const hooks = require('./reservations.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/reservations', new Reservations(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('reservations');

  service.hooks(hooks);
};
