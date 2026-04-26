const jwt = require('jsonwebtoken');

// ✅ Проверка JWT токена
const authMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Токен истёк' });
    }
    return res.status(401).json({ message: 'Невалидный токен' });
  }
};

module.exports = authMiddleware;
