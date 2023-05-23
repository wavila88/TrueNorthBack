const Operations = require("../models/OperationModel");
const Users = require("../models/UserModel");

const createDataBase = async () => {


  const UsersArray = [
    { userName: 'user1', password: 'password1', status: 'active' },
    { userName: 'user2', password: 'password2', status: 'active' },
    { userName: 'josep@gmail.com', password: 'password3', status: 'active' },
  ];
  const operationsArray = [
    { type: 'addition', cost: 2 },
    { type: 'subtraction', cost: 5 },
    { type: 'multiplication', cost: 6 },
    { type: 'division', cost: 7 },
    { type: 'square_root', cost: 9 },
    { type: 'random_string', cost: 10 },
    { type: 'initial_value', cost: 200 },

  ];

  await Users.sync();
  await Operations.sync();
  const usersNumber = await Users.count();
  const operationsNumber = await Operations.count();
  if (usersNumber === 0) {
    UsersArray.forEach((user) => {
      Users.create(
        {
          userName: user.userName,
          password: user.password,
          status: user.status
        }
      )
    });
  }
  if (operationsNumber === 0) {
    operationsArray.forEach((operation) => {
      Operations.create({
        type: operation.type,
        cost: operation.cost
      })

    });
  }
}

module.exports = createDataBase;