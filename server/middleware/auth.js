// Example for a simple middleware
const authMiddleware = (req, res, next) => {
  // Your authentication logic here
  next();
};

module.exports = authMiddleware;
