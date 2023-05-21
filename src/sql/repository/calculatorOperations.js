const { OPERATIONS} = require("../../utils/operation");
const Operations = require("../models/OperationModel");
const Records = require("../models/RecordModel");
const { validateRecords } = require("./recordsRepo");


/**
 * 
 *@returns common values required by all operations
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


const createRecords = async (operationId,userId,amount, newBalance, operationResponse) => {
 return await Records.create({
    operation_id: operationId,
    user_id: userId,
    amount: amount,
    user_balance: newBalance,
    operation_response: operationResponse,
    record_deleted: false,
   })
  }

module.exports ={
  commonOperations,
  createRecords,
  getInitialCostValue,
  getOperationCost
}