const jwt = require('jsonwebtoken');

const ferifica = async (req, res, next) => {
  const token = req.headers['x-access-token'];
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ Errors: ['Token invalido'] });
    req.id = decoded.id;
    next();
  })
}

module.exports = ferifica;