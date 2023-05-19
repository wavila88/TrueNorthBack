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


module.exports = {
  OPERATIONS,
  createOperationResponse
}