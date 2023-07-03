function logError(err, req, res, next) {
  console.error(err);
  // se usa next para indicarle que siga con el siguiente middleware
  next(err);
}

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack
  });
}

function boomErrorHandler(err, req, res, next) {
  // si existe un error y se encuentra dentro de la librería boom, entra al if
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

module.exports = { logError, errorHandler, boomErrorHandler };
