const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Admins only.",
    });
  }
};

const userOnly = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    return res.status(403).json({
      message: "Access denied. Users only.",
    });
  }
};

module.exports = { adminOnly, userOnly };