const errorHandler = (error, req, res, next) => {
  const { name, statusCode, status } = error;
  if (name === 'UnauthorizedError') {
    error.message = 'User is not authorized';
  }

  res.status(statusCode || status || 500).json({
    success: false,
    message: error.message || 'Internal Server Error',
    payload: null,
  });
};

export default errorHandler;
