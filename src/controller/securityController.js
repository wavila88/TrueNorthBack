const { loginRepo } = require("../sql/repository/securityRepo");
const jwt = require('jsonwebtoken');
const config = require("../utils/config");
const response = require('../network/response');

// Store invalid tokens (e.g., in a database or cache)
const invalidTokens = new Set();

const loginController = async (userName, password) => {
  const user = await loginRepo({ userName, password });
  if (user) {

    return createToken(user);
  } else {
    throw Error('incorrect credentials');
  }
};

const createToken = (user) => {
  const payload = {
    id: user.id,
    userName: user.userName
  }

  return {
    user: payload,
    token: jwt.sign(payload, config.security.secretKey, { expiresIn: config.security.sessionTime })
  }
}
/**
 * Middleware to validate if user is authenticated to execute method
 */
const validateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      // Check if token is in the invalid tokens set
      
      const token = authorizationHeader.split(' ')[1];
      if (invalidTokens.has(token)) {
       return response.error(req, res, { response: 'Token has been invalidated' }, 401)
      }
      await new Promise((resolve, reject) => {
        jwt.verify(token, config.security.secretKey, (error, decoded) => {
          if (error) {
            reject(error);
          } else {
            resolve(decoded);
          }
        });
      });
      //Call other function
      next();
    } else {
      response.error(req, res, { response: 'No Token' }, 401)
    }
  } catch (error) {
    response.error(req, res, { response: 'Unauthorized' }, 401)
  }
};

const logoutController = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    response.error(req, res, { response: 'Unauthorized' }, 401)
  }

  // Add the token to the invalid tokens set
  invalidTokens.add(token);
  return response.success(req,res,{response: 'success logout'},200);
};


module.exports = {
  loginController,
  validateToken,
  createToken,
  logoutController
}