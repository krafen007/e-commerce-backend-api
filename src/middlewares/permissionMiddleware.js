const permissionMiddleware = (req, res, next) => {
  const role = req.user.role;

  if (role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      message: 'Access denied. Only admin can do those operations',
    });
  }
};

export default permissionMiddleware;
