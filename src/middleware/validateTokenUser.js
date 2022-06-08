const jwt = require('jsonwebtoken');

const ferificaUser = async (req, res, next) => {
  const token = req.headers['authorization-user'];
  if (!token) {
    return res.status(401).json({ Errors: 'Token não enviado!' })
  }
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ Errors: 'Token invalido!' })
    }
    req.userId = decoded.userId;
    next();
  })
}

module.exports = ferificaUser;