const Operations = require("../models/OperationModel");
const Users = require("../models/UserModel");

const createDataBase = async () =>{

 
  const UsersArray = [
    {userName: 'user1', password: 'password1', status:'active' },
    {userName: 'user2', password: 'password2', status:'active'},
  ];
  const operationsArray = [
    {type: 'addition', cost:2},
    {type: 'subtraction', cost:5},
    {type: 'multiplication', cost:6},
    {type: 'division', cost:7},
    {type: 'square_root', cost:9},
    {type: 'random_string', cost:10},
    {type: 'initial_value', cost:50},
  
  ];

  await Users.sync();
  await Operations.sync();
  const users = await Users.findAll();
  if(users.length === 0){
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

  operationsArray.forEach((operation) => {
    Operations.create({
      type: operation.type,
      cost: operation.cost
    })

  })
}

module.exports = createDataBase;