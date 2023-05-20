const assert = require('assert');
const sinon = require('sinon');
const securityRepo = require('../../../src/sql/repository/securityRepo');
const Users = require('../../../src/sql/models/UserModel');

describe('loginRepo', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return a user object if the credentials are valid', async () => {
    // Mock the Sequelize findAll method to return a user object
    const findAllStub = sinon.stub(Users, 'findAll').resolves([{ id: 1, userName: 'user1', password: 'password1', status: 'active' }]);

    const user = { userName: 'user1', password: 'password1' };
    const result = await securityRepo.loginRepo(user);

    // Verify that the findAll method was called with the correct query
    assert.deepEqual(findAllStub.args[0][0], { where: { userName: 'user1', password: 'password1', status: 'active' } });

    // Verify that the result is the expected user object
    assert.deepEqual(result, { id: 1, userName: 'user1', password: 'password1', status: 'active' });
  });

  it('should return null if the credentials are invalid', async () => {
    // Mock the Sequelize findAll method to return an empty array
    const findAllStub = sinon.stub(Users, 'findAll').resolves([]);

    const user = { userName: 'user2', password: 'password2' };
    const result = await securityRepo.loginRepo(user);

    // Verify that the findAll method was called with the correct query
    assert.deepEqual(findAllStub.args[0][0], { where: { userName: 'user2', password: 'password2', status: 'active' } });

    // Verify that the result is null
    assert.strictEqual(result, null);
  });
});