const axios = require('axios');
const config = require('../utils/config');

/**
 * get Random number
 */
// const callLambdaService = async () => await axios.get(config.lambdaEndpoint);
const callLambdaService = async () => {
  const object =await axios.get(config.lambdaEndpoint);
  console.log(`RESULT ${object.data?.body}`);
  return object.data?.body;
}

module.exports = {callLambdaService};
