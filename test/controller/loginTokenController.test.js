const security = require('../../src/controller/securityController');
const securityRepo = require('../../src/sql/repository/securityRepo');

const jwt = require('jsonwebtoken'); // Import the jwt module

// Mock the dependencies
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn().mockReturnValue('mockedToken')
}));

jest.mock('../../src/sql/repository/securityRepo');
//just affect mock createToken
jest.mock('../../src/controller/securityController', () => {
  const originalModule = jest.requireActual('../../src/controller/securityController');
  return {
    ...originalModule,
    createToken: jest.fn()
  };
});

jest.mock('../../src/utils/config.js', () => ({
  security: {
    secretKey: 'your-secret-key'
  },
  sqlConection: {
    user: 'user',
    password: 'password',
    server: 'server',
    database: 'databas',
  }
}));



describe('loginController', () => {
  afterEach(() => {

    console.log('Before each test');
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.log('After each test');
  });

  it('should return a token if the user credentials are correct', async () => {
    const user = {
      id: 1,
      userName: 'testuser',
      password: 'password',
      status: 'active',
    };
    const mockToken = 'mockedToken';

    security.createToken.mockReturnValue(mockToken);
    securityRepo.loginRepo.mockResolvedValue(user);

    const result = await security.loginController(user.userName, user.password);

    expect(result.token).toEqual(mockToken);
    expect(securityRepo.loginRepo).toHaveBeenCalledWith({ userName: user.userName, password: user.password });
  });

});






describe('validateToken', () => {
  let req, res, next;

  beforeEach(() => {
    console.log('before each test')
    req = { headers: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    console.log('after each test')
  });

  it('should send an error response if token is missing', async () => {
    await security.validateToken(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.send).toHaveBeenCalledWith({
      error: false,
      status: 401,
      body:  {"response": "No Token"},
    } );
  });
});