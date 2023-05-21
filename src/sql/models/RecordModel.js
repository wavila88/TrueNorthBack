const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../../sql/connect');
const Operations = require('./OperationModel');
// import Rol from './RolModel';

const Records = sequelize.define('Records', {
  // Model attributes are defined here
  operation_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Operations', // 'fathers' refers to table name
      key: 'id', // 'id' refers to column name in fathers table
   },
  },
   user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', // 'fathers' refers to table name
      key: 'id', // 'id' refers to column name in fathers table
   },
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
    length: 30
  },
  user_balance: {
    type: DataTypes.INTEGER,
    allowNull: false,
    length: 30
  },
  operation_response: {
    type: DataTypes.STRING,
    allowNull: false,
    length: 50
  },
  record_deleted: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  }
}, {
  freezeTableName: true
});
//define asociation
Records.belongsTo(Operations, { foreignKey: 'operation_id', as: 'operation' });

// `sequelize.define` also returns the model
console.log(Records === sequelize.models.Records); // true

sequelize.sync().then(() => {
  console.log('Records table created successfully!');

}).catch((error) => {
  console.error('Unable to create table : ', error);
});

module.exports = Records;