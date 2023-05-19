const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../sql/connect');
// import Rol from './RolModel';

const Operations = sequelize.define('Operations', {
  // Model attributes are defined here
  type: {
    type: DataTypes.ENUM('addition', 'subtraction','division','multiplication','square_root','random_string','initial_value'),
    allowNull: false,
    length: 20,
    defaultValue: 'addition',
    unique: true
  },
  cost: {
    type: DataTypes.INTEGER,
    allowNull: false,
    length: 30,
  }
}, {
  freezeTableName: true
});


// `sequelize.define` also returns the model
console.log(Operations === sequelize.models.Operations); // true

sequelize.sync().then(() => {
  console.log('Operations table created successfully!');

}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Operations;