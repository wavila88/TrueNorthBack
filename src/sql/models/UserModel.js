const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../sql/connect');
// import Rol from './RolModel';

const Users = sequelize.define('Users', {
  // Model attributes are defined here
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 30,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 30
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    length: 30,
    defaultValue: 'active',
  }
}, {
  freezeTableName: true
});


// `sequelize.define` also returns the model
console.log(Users === sequelize.models.Users); // true

sequelize.sync().then(() => {
  console.log('User table created successfully!');

}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Users;