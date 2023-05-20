const express = require('express');
const { loginRepo } = require('../sql/repository/securityRepo');
const response = require('../network/response');
const { loginController } = require('../controller/securityController');

const router = express.Router();

router.post('/login', login);
router.post('/singOut', singOut);


async function login(req, res) {
  try{
    const {userName, password} = req.body;
    const loginRes = await loginController(userName, password);
    response.success(req, res, loginRes, 200);
  } catch(error){
    response.error(req, res, `Authentication error ${error.message}`, 401)
  }
}

async function singOut(){}

module.exports = router;