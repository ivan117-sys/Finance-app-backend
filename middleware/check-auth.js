const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    const token = req.headers.authorization.split(' ')[1]; // Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error('Authentication failed!');
    }
    const decodedToken = jwt.verify(token, 'supersecret_dont_share');
    req.userDate = { userId: decodedToken.userId };
    next();
  } catch (err) {
    res.status(400);
    const error = new Error('Authentication failed!');
    return next(error);
  }
};
