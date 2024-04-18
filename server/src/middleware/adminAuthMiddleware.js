const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.admin) {
      return res.status(403).json({ message: 'Bạn không có quyền truy cập vào API này' });
    }
    next();
  };
  module.exports = isAdmin;