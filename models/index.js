'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const DataTypes = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

// this config no need POSTGRES PORT 5432
// const sequelize = new Sequelize(config.database, config.username, config.password, config);


let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    // return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    const files =  (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    console.log(files);
    return files
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    console.log(model);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.usergame = require('./usergame')(sequelize, Sequelize, DataTypes);
db.userbiodata = require('./userbiodata')(sequelize, Sequelize, DataTypes);

module.exports = db;



