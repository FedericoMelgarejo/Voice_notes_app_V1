'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class records extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  records.init({
    title: DataTypes.STRING,
    addressee: DataTypes.STRING,
    file: DataTypes.STRING
  }, {
    sequelize,
    timestamps:true,
    paranoid:true,
    modelName: 'records',
  });
  return records;
};