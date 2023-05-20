const { callLambdaService } = require("../services/calculatorService");
const { commonOperations, createRecords } = require("../sql/repository/calculatorOperations");
const { OPERATIONS, addition, substraction, multiplication, division, squareRoot, createOperationResponse } = require("../utils/operation");



const additionController = async (userId, numbers) => 
await commonOperationsController(userId, OPERATIONS.addition, addition, numbers);

const substractController = async (userId, numbers) => 
await commonOperationsController(userId, OPERATIONS.subtraction, substraction, numbers);

const multiplyController = async (userId, numbers) => 
await commonOperationsController(userId, OPERATIONS.multiplication, multiplication, numbers);

const divideController = async (userId, numbers) => 
await commonOperationsController(userId, OPERATIONS.division, division, numbers);

const squareRootController = async (userId, numbers) => 
await commonOperationsController(userId, OPERATIONS.square_root, squareRoot, numbers);

const randomNumberController = async (userId, numbers) => 
await commonOperationsController(userId, OPERATIONS.random_string, callLambdaService, numbers);



/**
 * @param {number} userId  
 * @param {OPERATIONS} operationType 
 * @param {Function} callBack function to make operation
 * @param {Array} numbers array of numbers 
 * @returns {object} make operation and save record in DB
 */
const commonOperationsController = async (userId, operationType, callBack, numbers) => {
  try{
    const { initialCostValue, amount, newBalance, operationId } = await commonOperations(operationType, userId);
    let result;
    //If operation is squareRoot  just need one number, if is randomNumber not need numbers
    if (operationType === OPERATIONS.square_root) {
      result = await callBack(numbers[0]);
    } else if (operationType === OPERATIONS.random_string) {
      result = await callBack();
    } else {
      result = await callBack(numbers[0],numbers[1]);
    }
    return await validateAction(operationId, userId, amount, newBalance,
      createOperationResponse(initialCostValue, amount, newBalance, result));
  } catch(error){
    throw new Error(`Error in common operations ${error.message}`)
  }
}

/**
 *  if the balance is ok make the action if not the request is denied
 * */
const validateAction = async (operationId, userId, amount, newBalance, operationResponse) => {
  if (newBalance > -1) {
    const record = await createRecords(operationId, userId, amount, newBalance, operationResponse);
    return {
      newbalance: record.user_balance,
      operationResponse
    }
  } else {
    return false;
  }
}

module.exports = {
  additionController,
  substractController,
  multiplyController,
  divideController,
  squareRootController,
  randomNumberController
}