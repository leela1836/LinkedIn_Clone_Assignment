const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  const token = req.header('x-auth-token') || req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ msg: 'No auth token' });
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) { res.status(401).json({ msg: 'Token not valid' }); }
}
module.exports = auth;
