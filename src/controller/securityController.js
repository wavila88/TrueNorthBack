const { loginRepo } = require("../sql/repository/securityRepo");
const jwt = require('jsonwebtoken');
const config = require("../utils/config");
const response = require('../network/response')

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
    token: jwt.sign(payload, config.security.secretKey, { expiresIn: '3m' })
  }
}
/**
 * Middleware to validate if user is authenticated to execute method
 */
const validateToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers['authorization'];
    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1];
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
      response.error(req,res,{response: 'No Token'},401)
    }
  } catch (error) {
    response.error(req,res,{response: 'Unauthorized'},401)
  }
}


module.exports = {
  loginController,
  validateToken
}