module.exports = (err, req, res, next) => {
  console.log(err);
  let statusCode = 500;
  if (err.name === 'ValidationError') {
    statusCode = 400;
  }
  res.status(statusCode).json({ message: err.message, name: err.name });
};
