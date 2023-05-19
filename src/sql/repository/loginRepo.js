const Users = require("../models/UserModel");
const createDataBase = require("./createDataBase");

const loginRepo = async(user) => {
  await createDataBase();
  const query = {userName: user.userName, password: user.password, status:'active' };
  const users = await Users.findAll({ where: query})
  return users.length > 0 ? users[0]: null;
}



module.exports ={loginRepo}