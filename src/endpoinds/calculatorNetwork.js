const express = require('express');
 const response = require('../network/response');
const { loginRepo } = require('../sql/repository/loginRepo');
const { additionRepo, substractRepo, multiplyRepo, divideRepo, squareRootRepo } = require('../sql/repository/calculatorOperations');
// const Store = require('../store/redis');


const router = express.Router();


//Routes
router.post('/login', login);
router.post('/add', addition);
router.post('/sub', subtraction);
router.post('/mul', multiplication);
router.post('/div', division);
router.post('/sq', squareRoot);
// router.post('/randomString', randomString);


async function login(req, res) {
  const userName = req.body.userName;
  const password = req.body.password;
  console.log(`init params ${JSON.stringify(req.body)}`);
  const user =await loginRepo({userName, password});
  if(user!== null){
    response.success(req,res,user,200); 

  }else{
    response.error(req,res, 'not user found',404);
  }
} 

async function addition(req,res){
  const { userId, numbers } = req.body;
  const newBalance =await additionRepo(userId, numbers);
  operationResponse(req, res, newBalance);

};

async function subtraction(req,res){
  const { userId, numbers } = req.body;
  const newBalance =await substractRepo(userId, numbers);
  operationResponse(req, res, newBalance);

};
async function multiplication(req,res){
  const { userId, numbers } = req.body;
  const newBalance =await multiplyRepo(userId, numbers);
  operationResponse(req, res, newBalance);

};
async function division(req,res){
  const { userId, numbers } = req.body;
  const newBalance =await divideRepo(userId, numbers);
  operationResponse(req, res, newBalance);
};

async function squareRoot(req,res){
  const { userId, numbers } = req.body;
  const newBalance =await squareRootRepo(userId, numbers);
  operationResponse(req, res, newBalance);
};

async function operationResponse(req,res,newBalance){
  if(newBalance){
    response.success(req,res,
      {
        response: `success operation`,
        newBalance
      },200); 
  } else{
    response.error(req,res, {response:'Forbidden operation, not enough balance'},403 )
  }
}



module.exports = router;