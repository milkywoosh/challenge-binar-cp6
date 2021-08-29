'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBiodata.belongsTo(models.UserGame, {foreignKey: 'user_id'});
    }
  };
  UserBiodata.init({
    fname: DataTypes.STRING,
    lname: DataTypes.STRING,
    age: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserBiodata',
  });

  return UserBiodata;
};