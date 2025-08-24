const validationMiddleware = (schema) => {
  return (req, res, next) => {
    try {
      const { error } = schema.validate(req.body);

      if (error) {
        const details = error.details.map((err) => {
          return { field: err.path[0], message: err.message };
        });

        return res.status(400).json({
          message: 'Validation error',
          error: details,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: 'Internal server error in validation middleware',
        error: error.message,
      });
    }
  };
};

export default validationMiddleware;
