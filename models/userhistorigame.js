'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserHistoriGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserHistoriGame.belongsTo(models.UserGame, {foreignKey: 'username_id'})
    }
  };
  UserHistoriGame.init({
    score: DataTypes.INTEGER,
    username_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserHistoriGame',
  });
  return UserHistoriGame;
};