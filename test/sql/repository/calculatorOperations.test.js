const sinon = require('sinon');
const assert = require('assert');
const Records = require('../../../src/sql/models/RecordModel');
const calculatorRepo = require('../../../src/sql/repository/calculatorOperations');
const Operations = require('../../../src/sql/models/OperationModel');
const { OPERATIONS } = require('../../../src/utils/operation');
describe('calculator repo', () => {

  beforeEach(() => {
   
    console.log('Before each test');
  });
   //avoid error of console.log after test is finished
  afterEach(() => {
    console.log('After each test');
    sinon.restore();
  });

  it('getInitialCostValue, if there are not records should return user_balance of balance', async () => {
    const findOne = sinon.stub(Records, 'findOne').resolves(undefined);
    sinon.stub(Operations, 'findOne').resolves({id:1, type: 'initial_value', cost:200});

    assert.equal(await calculatorRepo.getInitialCostValue(1), 200)
  });
  it('getInitialCostValue, if there are records should return user_balance of balance', async () => {
    const findOne = sinon.stub(Records, 'findOne').resolves({ id: 1, amount: 10, user_balance: 190, status: 'active' });

    assert.equal(await calculatorRepo.getInitialCostValue(1), 190)
  });

  it('getOperationCost, return amount and operationID', async () => {
    const mock = { cost: 10, id: 1 }
    const findOne = sinon.stub(Operations, 'findOne').resolves(mock);
    const {amount,operationId} = await calculatorRepo.getOperationCost(OPERATIONS.addition);
    assert.equal(amount,mock.cost );
    assert.equal(operationId,mock.id );
  });

});