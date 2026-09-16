'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('appointments', ['patient_id']);
    await queryInterface.removeIndex('appointments', ['staff_id']);
    await queryInterface.removeIndex('appointments', ['appointment_date']);
    await queryInterface.renameColumn('appointments', 'id', 'appointment_id');
    await queryInterface.renameColumn('appointments', 'appointment_time', 'time');
    await queryInterface.renameColumn('appointments', 'reason', 'service');
    await queryInterface.removeColumn('appointments', 'patient_id');
    await queryInterface.removeColumn('appointments', 'staff_id');
    await queryInterface.removeColumn('appointments', 'appointment_date');
    await queryInterface.removeColumn('appointments', 'notes');
    await queryInterface.addColumn('appointments', 'patient', { type: Sequelize.STRING, allowNull: false, defaultValue: '' });
    await queryInterface.addColumn('appointments', 'doctor', { type: Sequelize.STRING, allowNull: false, defaultValue: '' });
    await queryInterface.addColumn('appointments', 'room', { type: Sequelize.STRING, allowNull: false, defaultValue: '' });
    await queryInterface.addIndex('appointments', ['patient']);
    await queryInterface.addIndex('appointments', ['doctor']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('appointments', ['patient']);
    await queryInterface.removeIndex('appointments', ['doctor']);
    await queryInterface.removeColumn('appointments', 'room');
    await queryInterface.removeColumn('appointments', 'doctor');
    await queryInterface.removeColumn('appointments', 'patient');
    await queryInterface.addColumn('appointments', 'notes', { type: Sequelize.TEXT });
    await queryInterface.addColumn('appointments', 'appointment_date', { type: Sequelize.DATEONLY, allowNull: false, defaultValue: Sequelize.literal('CURRENT_DATE') });
    await queryInterface.addColumn('appointments', 'staff_id', { type: Sequelize.INTEGER, allowNull: true });
    await queryInterface.addColumn('appointments', 'patient_id', { type: Sequelize.INTEGER, allowNull: false, defaultValue: 1 });
    await queryInterface.renameColumn('appointments', 'service', 'reason');
    await queryInterface.renameColumn('appointments', 'time', 'appointment_time');
    await queryInterface.renameColumn('appointments', 'appointment_id', 'id');
    await queryInterface.addIndex('appointments', ['patient_id']);
    await queryInterface.addIndex('appointments', ['staff_id']);
    await queryInterface.addIndex('appointments', ['appointment_date']);
  }
};