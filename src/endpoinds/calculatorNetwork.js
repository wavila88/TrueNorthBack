const express = require('express');
const response = require('../network/response');
const { additionController, substractController, multiplyController, divideController, squareRootController, randomNumberController, getOperationBalanceController } = require('../controller/calculatorController');
const { validateToken } = require('../controller/securityController');

// const Store = require('../store/redis');


const router = express.Router();


//Routes
router.post('/operations', validateToken, getOperationsBalance);
router.post('/add', validateToken, addition);
router.post('/sub', validateToken, subtraction);
router.post('/mul', validateToken, multiplication);
router.post('/div', validateToken, division);
router.post('/sq', validateToken, squareRoot);
router.post('/ran', validateToken, random);


async function addition(req, res) {
  await commonOperations(req, res, additionController);
};

async function subtraction(req, res) {
  await commonOperations(req, res, substractController);
};
async function multiplication(req, res) {
  await commonOperations(req, res, multiplyController);

};
async function division(req, res) {
  await commonOperations(req, res, divideController);
};

async function squareRoot(req, res) {
  await commonOperations(req, res, squareRootController);
};

async function getOperationsBalance (req, res){
  try{
    const { userId } = req.body;
    if(!userId){
      return response.error(req, res, {response:'userId is required'},400 );
    }
    const body = await getOperationBalanceController(userId);
    return response.success(req,res,body,200);

  }catch(error){
    response.error(req, res, error.message, 500);
  }
}

async function random(req, res) {
  try {
    const { userId } = req.body;
    if(!userId){
      return response.error(req, res, {response:'userId is required'},400 );
    }
    const newBalance = await randomNumberController(userId);
    operationResponse(req, res, newBalance);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
};


async function commonOperations(req, res, callBack) {
  try {
    const { userId, numbers } = req.body;
    if(!userId || !numbers){
      return response.error(req, res, {response:'userId and numbers are required'},400 );
    }
    const newBalance = await callBack(userId, numbers);
    operationResponse(req, res, newBalance);
  } catch (error) {
    response.error(req, res, error.message, 500);
  }
}

async function operationResponse(req, res, newBalance) {
  if (newBalance) {
    response.success(req, res,
      {
        response: `success operation`,
        newBalance
      }, 200);
  } else {
    response.error(req, res, { response: 'Forbidden operation, not enough balance' }, 403)
  }
}



module.exports = router;