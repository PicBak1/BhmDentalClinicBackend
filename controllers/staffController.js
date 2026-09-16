const createResourceController = require('./resourceController');
const staffService = require('../services/staffService');

module.exports = createResourceController(staffService, 'Staff');
