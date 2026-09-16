'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointments', {
      appointment_id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      time: { type: Sequelize.TIME, allowNull: false },
      patient: { type: Sequelize.STRING, allowNull: false },
      service: { type: Sequelize.STRING, allowNull: false },
      doctor: { type: Sequelize.STRING, allowNull: false },
      room: { type: Sequelize.STRING, allowNull: false },
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'scheduled' },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });

    await queryInterface.addIndex('appointments', ['patient']);
    await queryInterface.addIndex('appointments', ['doctor']);
    await queryInterface.addIndex('appointments', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('appointments');
  }
};