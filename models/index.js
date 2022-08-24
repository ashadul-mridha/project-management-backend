const dbConfig = require('../config/dbConfig');
const {Sequelize , DataTypes} = require('sequelize');

//database connection setup
const sequelize = new Sequelize( dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

//testing the connection
sequelize.authenticate()
.then( () => {
    console.log('Connection has been established successfully.');
})
.catch(err => {
    console.log('Unable to connect to the database:', err.message);
    // console.log('oh no');
})

//create db model object
const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//db object model
db.user = require('./userModel')(sequelize, DataTypes);
db.setting = require('./settingModel')(sequelize, DataTypes);

//database with model and create table
db.sequelize.sync({force: false})
.then( () => {
    console.log('yes resync done!');
})
.catch( err => {
    console.log(err);
})

module.exports = db;