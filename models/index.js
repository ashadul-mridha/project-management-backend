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
db.project = require('./projectModel')(sequelize, DataTypes);
db.projectStatus = require('./projectStatusModel')(sequelize, DataTypes);
db.projectUser = require('./project_user')(sequelize, DataTypes);
db.task = require('./taskModel')(sequelize, DataTypes);
db.taskUser = require('./taskUser')(sequelize, DataTypes);
db.taskImage = require('./taskImageModel')(sequelize, DataTypes);
db.comment = require('./commentModel')(sequelize, DataTypes);
db.setting = require('./settingModel')(sequelize, DataTypes);
db.meeting = require('./meetingModal')(sequelize, DataTypes);
db.meetingUser = require('./meetingUserModal')(sequelize, DataTypes);

//database with model and create table
db.sequelize.sync({force: false})
.then( () => {
    console.log('yes resync done!');
})
.catch( err => {
    console.log(err);
})

//all relations

// 1 to many relation
db.user.hasMany(db.comment , {
  foreignKey: 'userId'
})
db.project.hasMany(db.projectStatus , {
  foreignKey: 'projectId'
})
db.project.hasMany(db.task , {
  foreignKey: 'projectId'
})
db.projectStatus.hasMany(db.task , {
  foreignKey: 'statusId'
})
db.task.hasMany(db.taskImage , {
  foreignKey: 'taskId'
})
db.task.hasMany(db.comment , {
  foreignKey: 'taskId'
})
db.task.hasMany(db.taskUser , {
  foreignKey: 'taskId'
})
db.projectUser.belongsTo(db.user , {
  foreignKey: 'userId'
})

// many to one relation
db.task.belongsTo(db.project , {
  foreignKey: 'projectId'
})
db.task.belongsTo(db.projectStatus , {
  foreignKey: 'statusId'
})
db.comment.belongsTo(db.user , {
  foreignKey: 'userId'
})
db.taskUser.belongsTo(db.task , {
  foreignKey: 'userId'
})
// many to many relation
db.project.belongsToMany(db.user, {
  through: "project_user",
  foreignKey: "projectId",
});
db.user.belongsToMany(db.project, {
  through: "project_user",
  foreignKey: "userId",
});
db.task.belongsToMany(db.user, {
  through: "task_user",
  foreignKey: "taskId",
});
db.user.belongsToMany(db.task, {
  through: "task_user",
  foreignKey: "userId",
});
db.meeting.belongsToMany(db.user, {
  through: "meeting_user",
  foreignKey: "meetingId",
});
db.user.belongsToMany(db.meeting, {
  through: "meeting_user",
  foreignKey: "userId",
});

module.exports = db;