'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('appointments', 'date', { type: Sequelize.DATEONLY, allowNull: true });
    await queryInterface.sequelize.query("UPDATE appointments SET date = CURRENT_DATE WHERE date IS NULL");
    await queryInterface.changeColumn('appointments', 'date', { type: Sequelize.DATEONLY, allowNull: false });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn('appointments', 'date');
  }
};