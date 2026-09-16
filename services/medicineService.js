const { Medicine } = require('../models');
const createResourceService = require('./resourceService');

module.exports = createResourceService(
  Medicine,
  ['medicine', 'category', 'supplier', 'status'],
  ['category', 'supplier', 'status']
);
