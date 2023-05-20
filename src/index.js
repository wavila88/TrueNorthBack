const bodyParser = require('body-parser');
const express = require('express');
const config = require('./utils/config');
const calculatorRouter = require('./endpoinds/calculatorNetwork');
const securityRouter = require('./endpoinds/security');
const port = config.port;

const app = express()
app.use(bodyParser.json());

app.use('/', calculatorRouter);
app.use('/security', securityRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})