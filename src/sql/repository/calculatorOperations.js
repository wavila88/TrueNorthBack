const { additionBs, substractionBs, multiplicationBs, divisionBs, squareRootBs } = require("../../bussiness/calculatorBs");
const { OPERATIONS, OPERATION_RESPONSE, createOperationResponse } = require("../../utils/operation");
const Operations = require("../models/OperationModel")
const Records = require("../models/RecordModel")




const additionRepo = async (userId, numbers) => {
  const {initialCostValue,amount,newBalance, operationId} = await commonOperations(OPERATIONS.addition,userId);
  const result =additionBs( numbers[0],numbers[1]);
  return await validateAction(operationId,userId,amount, newBalance ,
    createOperationResponse(initialCostValue ,amount,newBalance,result));
};

const substractRepo = async (userId, numbers) => {
  const {initialCostValue,amount,newBalance, operationId} = await commonOperations(OPERATIONS.subtraction,userId);
  const result =substractionBs( numbers[0],numbers[1]);
  return await validateAction(operationId,userId,amount, newBalance ,
    createOperationResponse(initialCostValue ,amount,newBalance,result));
};

const multiplyRepo = async (userId, numbers) => {
  const {initialCostValue,amount,newBalance, operationId} = await commonOperations(OPERATIONS.multiplication,userId);
  const result =multiplicationBs( numbers[0],numbers[1]);
  return await validateAction(operationId,userId,amount, newBalance ,
    createOperationResponse(initialCostValue ,amount,newBalance,result));
};

const divideRepo = async (userId, numbers) => {
  const {initialCostValue,amount,newBalance, operationId} = await commonOperations(OPERATIONS.division,userId);
  const result =divisionBs( numbers[0],numbers[1]);
  return await validateAction(operationId,userId,amount, newBalance ,
    createOperationResponse(initialCostValue ,amount,newBalance,result));
};

const squareRootRepo = async (userId, numbers) => {
  const {initialCostValue,amount,newBalance, operationId} = await commonOperations(OPERATIONS.square_root,userId);
  const result =squareRootBs(numbers[0]);
  return await validateAction(operationId,userId,amount, newBalance ,
    createOperationResponse(initialCostValue ,amount,newBalance,result));
};





/**
 * 
 *@returns common values used by differen operations
 */
const commonOperations = async (operationType, userId) => {
  const initialCostValue =await getInitialCostValue( userId);
  const {amount,operationId} = await getOperationCost(operationType);
  console.log(`initial cost ${initialCostValue}, amount ${amount}`);
  const newBalance = initialCostValue - amount;
  return {
    initialCostValue,
    amount,
    newBalance,
    operationId,
  }
}



const getOperationCost = async (operationType) => {
  const operation = await Operations.findOne({where:{type: operationType}});
  return {
    amount: operation.cost,
    operationId: operation.id
  };
}

const getInitialCostValue = async (user_id) => {
  let initialCostValue;
  const lastRecort = await validateRecords( user_id)
   if(lastRecort){
     initialCostValue = lastRecort.user_balance;
   }else{
     initialCostValue = await getInitialCost();
   }
   return initialCostValue;
}

/**
 * 
 * gets the last record of user.
 * @returns 
 */
const validateRecords = async ( userId) => 
await Records.findOne({
  where: { user_id: userId },
  order: [['createdAt', 'DESC']],
});


/**
 * 
 * @returns the initial cost if user doesn´t have records
 */
const getInitialCost = async () => {

  const obj =await Operations.findOne(
    {
      attributes:['cost'],
      where: { type: OPERATIONS.initial_value} 
    });

    return obj.cost;
}

/**
 *  if the balance is ok make the action if not the request is denied
 * */ 
const validateAction = async (operationId,userId,amount, newBalance, operationResponse) => {
  if(newBalance > -1){
    const record =await createRecords(operationId,userId,amount, newBalance, operationResponse);
    return {
      newbalance: record.user_balance,
      operationResponse
    }
  } else {
    return false;
  }
}

const createRecords = async (operationId,userId,amount, newBalance, operationResponse) => {
 return await Records.create({
    operation_id: operationId,
    user_id: userId,
    amount: amount,
    user_balance: newBalance,
    operation_response: operationResponse
   })
  }




module.exports ={
  additionRepo,
  substractRepo,
  multiplyRepo,
  divideRepo,
  squareRootRepo
}