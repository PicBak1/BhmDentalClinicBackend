'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('patients', {
      id: { allowNull: false, autoIncrement: true, primaryKey: true, type: Sequelize.INTEGER },
      patient: { type: Sequelize.STRING, allowNull: false },
      sex: Sequelize.STRING,
      age: Sequelize.INTEGER,
      contact: Sequelize.STRING,
      last_visit: Sequelize.DATEONLY,
      diagnosis: Sequelize.TEXT,
      treatment: Sequelize.TEXT,
      amount: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      amount_paid: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      balance: { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
      status: { type: Sequelize.STRING, allowNull: false, defaultValue: 'active' },
      created_at: { allowNull: false, type: Sequelize.DATE },
      updated_at: { allowNull: false, type: Sequelize.DATE }
    });
    await queryInterface.addIndex('patients', ['contact']);
    await queryInterface.addIndex('patients', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('patients');
  }
};
