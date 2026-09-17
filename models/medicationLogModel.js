'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MedicationLog extends Model {}

  MedicationLog.init({
    medicineId: { type: DataTypes.INTEGER, allowNull: false },
    patient: { type: DataTypes.STRING, allowNull: false },
    dosage: { type: DataTypes.STRING, allowNull: false },
    route: { type: DataTypes.STRING, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } },
    recordedAt: { type: DataTypes.DATE, allowNull: false },
    clinician: { type: DataTypes.STRING, allowNull: false },
    notes: DataTypes.TEXT
  }, { sequelize, modelName: 'MedicationLog', tableName: 'medication_logs', underscored: true });

  return MedicationLog;
};