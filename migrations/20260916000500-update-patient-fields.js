'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeIndex('patients', ['email']);
    await queryInterface.removeIndex('patients', ['phone']);
    await queryInterface.renameColumn('patients', 'full_name', 'patient');
    await queryInterface.renameColumn('patients', 'gender', 'sex');
    await queryInterface.renameColumn('patients', 'phone', 'contact');
    await queryInterface.removeColumn('patients', 'date_of_birth');
    await queryInterface.removeColumn('patients', 'email');
    await queryInterface.removeColumn('patients', 'address');
    await queryInterface.removeColumn('patients', 'emergency_contact_name');
    await queryInterface.removeColumn('patients', 'emergency_contact_phone');
    await queryInterface.removeColumn('patients', 'medical_history');
    await queryInterface.removeColumn('patients', 'allergies');
    await queryInterface.addColumn('patients', 'age', { type: Sequelize.INTEGER });
    await queryInterface.addColumn('patients', 'last_visit', { type: Sequelize.DATEONLY });
    await queryInterface.addColumn('patients', 'diagnosis', { type: Sequelize.TEXT });
    await queryInterface.addColumn('patients', 'treatment', { type: Sequelize.TEXT });
    await queryInterface.addColumn('patients', 'amount', { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 });
    await queryInterface.addColumn('patients', 'amount_paid', { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 });
    await queryInterface.addColumn('patients', 'balance', { type: Sequelize.DECIMAL(10, 2), allowNull: false, defaultValue: 0 });
    await queryInterface.addColumn('patients', 'status', { type: Sequelize.STRING, allowNull: false, defaultValue: 'active' });
    await queryInterface.addIndex('patients', ['contact']);
    await queryInterface.addIndex('patients', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.removeIndex('patients', ['contact']);
    await queryInterface.removeIndex('patients', ['status']);
    await queryInterface.removeColumn('patients', 'status');
    await queryInterface.removeColumn('patients', 'balance');
    await queryInterface.removeColumn('patients', 'amount_paid');
    await queryInterface.removeColumn('patients', 'amount');
    await queryInterface.removeColumn('patients', 'treatment');
    await queryInterface.removeColumn('patients', 'diagnosis');
    await queryInterface.removeColumn('patients', 'last_visit');
    await queryInterface.removeColumn('patients', 'age');
    await queryInterface.renameColumn('patients', 'contact', 'phone');
    await queryInterface.renameColumn('patients', 'sex', 'gender');
    await queryInterface.renameColumn('patients', 'patient', 'full_name');
  }
};