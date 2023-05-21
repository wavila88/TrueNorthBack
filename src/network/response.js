exports.success = (req, res, message, status) =>{

  let statusCode = status || 200;
  let statusMessage = message || '';

  res.status(status).send({
    status: statusCode,
    body: statusMessage
  });
}

exports.error = (req, res, message, status) =>{

  let statusCode = status || 500;
  let statusMessage = message || 'internal server error';

  res.status(status).send({
    status: statusCode,
    body: statusMessage
  });
}