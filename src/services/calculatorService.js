const axios = require('axios');
const config = require('../utils/config');

/**
 * get Random number
 */
const callLambda = async () => await axios.get(config.lambdaEndpoint);

module.exports = {callLambda};
