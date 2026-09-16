'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
  }

  Patient.init({
    patient: { type: DataTypes.STRING, allowNull: false },
    sex: DataTypes.STRING,
    age: { type: DataTypes.INTEGER, validate: { min: 0 } },
    contact: DataTypes.STRING,
    lastVisit: DataTypes.DATEONLY,
    diagnosis: DataTypes.TEXT,
    treatment: DataTypes.TEXT,
    amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0, validate: { min: 0 } },
    amountPaid: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0, validate: { min: 0 } },
    balance: { type: DataTypes.DECIMAL(10, 2), allowNull: false, defaultValue: 0 },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'active' }
  }, {
    sequelize,
    modelName: 'Patient',
    tableName: 'patients',
    underscored: true,
    hooks: {
      beforeValidate(patientRecord) {
        const amount = Number(patientRecord.amount || 0);
        const amountPaid = Number(patientRecord.amountPaid || 0);
        patientRecord.balance = Math.max(amount - amountPaid, 0).toFixed(2);
      }
    }
  });

  return Patient;
};
