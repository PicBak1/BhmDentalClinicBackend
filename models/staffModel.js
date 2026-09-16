'use strict';
const bcrypt = require('bcrypt');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    }
  }
  Staff.init({
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'staff' }
  }, {
    sequelize,
    modelName: 'Staff',
    tableName: 'staff',
    underscored: true,
    defaultScope: {
      attributes: { exclude: ['password'] }
    },
    hooks: {
      async beforeSave(staffMember) {
        if (staffMember.changed('password')) {
          staffMember.password = await bcrypt.hash(staffMember.password, 12);
        }
      }
    }
  });
  return Staff;
};