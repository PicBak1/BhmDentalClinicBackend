const { Patient } = require('../models');
const createResourceService = require('./resourceService');

module.exports = createResourceService(
  Patient,
  ['patient', 'contact', 'diagnosis', 'treatment', 'status'],
  ['sex', 'age', 'contact', 'status']
);
