'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGame extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGame.hasOne(models.UserBiodata, {foreignKey: 'user_id'})
      UserGame.hasMany(models.UserHistoriGame, {foreignKey: 'username_id'})
      // hasOne and hasMany put fk on target;
      // another try
      // Team.hasMany(Player, {
      //   foreignKey: 'clubId'
      // });
      // Player.belongsTo(Team);
      /*
        
      */
    }
  };
  UserGame.init({
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserGame',
  });
  return UserGame;
};