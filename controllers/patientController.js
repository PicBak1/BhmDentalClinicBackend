const createResourceController = require('./resourceController');
const patientService = require('../services/patientService');

module.exports = createResourceController(patientService, 'Patient');
