const createResourceController = require('./resourceController');
const medicineService = require('../services/medicineService');

module.exports = createResourceController(medicineService, 'Medicine');
