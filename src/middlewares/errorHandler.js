"use strict";
/* -------------------------------------------------------
    NODEJS EXPRESS | FLIGHT_API
------------------------------------------------------- */
// app.use(errorHandler):

module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    error: true,
    message: err.message,
  });
};
