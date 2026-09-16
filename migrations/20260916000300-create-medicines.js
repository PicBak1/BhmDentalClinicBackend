'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('medicines', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      medicine: { type: Sequelize.STRING, allowNull: false },
      category: Sequelize.STRING,
      stock_level: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      unit: { type: Sequelize.STRING, allowNull: false, defaultValue: 'unit' },
      expiry_date: Sequelize.DATEONLY,
      supplier: Sequelize.STRING,
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'active' },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
    await queryInterface.addIndex('medicines', ['medicine']);
    await queryInterface.addIndex('medicines', ['category']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('medicines');
  }
};
