const { Appointment } = require('../models');
const createResourceService = require('./resourceService');

module.exports = createResourceService(
  Appointment,
  ['patient', 'service', 'doctor', 'room', 'status'],
  ['patient', 'doctor', 'room', 'status']
);