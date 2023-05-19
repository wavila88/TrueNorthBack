const bodyParser = require('body-parser');
const express = require('express');
const config = require('./utils/config');
const router = require('./endpoinds/calculatorNetwork');
const port = config.port;

const app = express()
app.use(bodyParser.json());

app.use('/', router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})