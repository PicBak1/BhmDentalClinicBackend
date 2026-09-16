const createResourceController = require('./resourceController');
const appointmentService = require('../services/appointmentService');

module.exports = createResourceController(appointmentService, 'Appointment');