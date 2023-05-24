const bodyParser = require('body-parser');
const express = require('express');
const config = require('./utils/config');
const calculatorRouter = require('./endpoinds/calculatorNetwork');
const securityRouter = require('./endpoinds/security');
const recordsRouter = require('./endpoinds/RecordsNetwork');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const port = config.port;

const app = express()
app.use(bodyParser.json());
app.use(cors());

const swaggerDoc = require('./swagger.json');


app.use('/', calculatorRouter);
app.use('/security', securityRouter);
app.use('/records', recordsRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})