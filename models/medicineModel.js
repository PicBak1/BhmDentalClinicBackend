'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {}

  Medicine.init({
    medicine: { type: DataTypes.STRING, allowNull: false },
    category: DataTypes.STRING,
    stockLevel: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0, validate: { min: 0 } },
    unit: { type: DataTypes.STRING, allowNull: false, defaultValue: 'unit' },
    expiryDate: DataTypes.DATEONLY,
    supplier: DataTypes.STRING,
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'active' }
  }, {
    sequelize,
    modelName: 'Medicine',
    tableName: 'medicines',
    underscored: true
  });

  return Medicine;
};
