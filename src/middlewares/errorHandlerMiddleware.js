const errorHandlerMiddleware = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        success: false,
        status: `${statusCode}`.startsWith(4) ? 'Fail' : 'Error',
        message: err.message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

export default errorHandlerMiddleware;
