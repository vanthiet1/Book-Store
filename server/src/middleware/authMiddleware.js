const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token không được cung cấp' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = JSON.stringify(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token không hợp lệ' });
  }
};

module.exports = authMiddleware;
