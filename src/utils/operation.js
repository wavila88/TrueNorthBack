const OPERATIONS = {
  addition: 'addition',
  subtraction: 'subtraction',
  multiplication: 'multiplication',
  division: 'division',
  square_root: 'square_root',
  random_string: 'random_string',
  initial_value: 'initial_value'
};

const createOperationResponse = (previousBalance, amount, newBalance, operationResult) => `Operation result: ${operationResult}, previous balance : ${previousBalance}, cost of service: ${amount}, new balance ${newBalance} ` 



const addition = (actualBalance, ammount) => actualBalance +ammount


const substraction = (actualBalance, ammount) => actualBalance - ammount;

const multiplication = (actualBalance, ammount) => actualBalance * ammount;

const division = (actualBalance, ammount) => actualBalance / ammount;

const squareRoot = (actualBalance) => Math.sqrt(actualBalance);


module.exports = {
  OPERATIONS,
  createOperationResponse,
  addition,
  substraction,
  multiplication,
  division,
  squareRoot,
}