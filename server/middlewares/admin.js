// ✅ Проверка роли — только для админа
const adminMiddleware = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Доступ только для администратора' });
  }
  next();
};

module.exports = adminMiddleware;
