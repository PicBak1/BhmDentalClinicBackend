'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.renameColumn('staff', 'full_name', 'name');
    await queryInterface.removeColumn('staff', 'phone');
    await queryInterface.removeColumn('staff', 'is_active');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('staff', 'phone', { type: Sequelize.STRING });
    await queryInterface.addColumn('staff', 'is_active', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true
    });
    await queryInterface.renameColumn('staff', 'name', 'full_name');
  }
};