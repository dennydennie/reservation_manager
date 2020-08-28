const reservations = require('./reservations/reservations.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(reservations);
};
