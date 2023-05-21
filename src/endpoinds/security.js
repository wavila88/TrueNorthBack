const express = require('express');
const { loginRepo } = require('../sql/repository/securityRepo');
const response = require('../network/response');
const { loginController, validateToken, logoutController } = require('../controller/securityController');

const router = express.Router();

router.post('/login', login);
router.post('/logout', validateToken,logout);


async function login(req, res) {
  try{
    const {userName, password} = req.body;
    const loginRes = await loginController(userName, password);
    response.success(req, res, loginRes, 200);
  } catch(error){
    response.error(req, res, `Authentication error ${error.message}`, 401)
  }
}

async function logout(req,res){
  try{
    await logoutController(req,res);
  }catch(error){
    response.error(req, res, `Error ${error.message}`)
  }
}

module.exports = router;