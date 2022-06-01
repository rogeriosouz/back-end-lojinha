const bcript = require('bcryptjs');
const Admin = require('../../models/adimin');
const validate = require('email-validator');
const jwt = require('jsonwebtoken');

exports.post = async (req, res) => {
  const { email, password } = req.body;

  const errors = [];

  if (!email || !password) {
    errors.push('Credencias invalidas');
  }

  if (String(password).length < 5 || String(password).length > 50) {
    errors.push('Password presisa ter de 5 a 50 caracteres!!');
  }

  if (!validate.validate(String(email))) {
    errors.push('Email Invalido');
  }

  const emailDb = await Admin.findOne({ email });

  if (!emailDb || !bcript.compareSync(String(password), emailDb.password)) {
    errors.push('Email ou password invalidos');
  }

  if (errors.length > 0) {
    return res.status(401).json({ Errors: errors })
  } else {
    const token = jwt.sign({ id: emailDb._id }, process.env.SECRET, { expiresIn: process.env.TOKEN_DAYS })
    return res.json({ LoginAdm: 'true', token })
  }
}