const { Staff } = require('../models');
const createResourceService = require('./resourceService');

const staffService = createResourceService(
  Staff,
  ['name', 'email', 'role'],
  ['role', 'email']
);

const createStaff = staffService.create;
staffService.create = async (data = {}) => {
  const missingFields = ['name', 'email', 'password'].filter((field) => !data[field]);
  if (missingFields.length > 0) {
    const error = new Error(`Missing required staff field(s): ${missingFields.join(', ')}`);
    error.status = 400;
    throw error;
  }

  return createStaff(data);
};

module.exports = staffService;