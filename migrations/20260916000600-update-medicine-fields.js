'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('medicines', ['name']);
    await queryInterface.renameColumn('medicines', 'name', 'medicine');
    await queryInterface.renameColumn('medicines', 'quantity', 'stock_level');
    await queryInterface.removeColumn('medicines', 'generic_name');
    await queryInterface.removeColumn('medicines', 'description');
    await queryInterface.removeColumn('medicines', 'reorder_level');
    await queryInterface.removeColumn('medicines', 'price');
    await queryInterface.addColumn('medicines', 'status', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'active'
    });
    await queryInterface.addIndex('medicines', ['medicine']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('medicines', ['medicine']);
    await queryInterface.removeColumn('medicines', 'status');
    await queryInterface.addColumn('medicines', 'price', { type: Sequelize.DECIMAL(10, 2) });
    await queryInterface.addColumn('medicines', 'reorder_level', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    });
    await queryInterface.addColumn('medicines', 'description', { type: Sequelize.TEXT });
    await queryInterface.addColumn('medicines', 'generic_name', { type: Sequelize.STRING });
    await queryInterface.renameColumn('medicines', 'stock_level', 'quantity');
    await queryInterface.renameColumn('medicines', 'medicine', 'name');
    await queryInterface.addIndex('medicines', ['name']);
  }
};