const errorHandler = async (err, req, res, next) => {
  console.log(err); // In mode dev

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';

  return res.status(statusCode).json({
    success: false,
    error: message,
  });
};

export default errorHandler;


