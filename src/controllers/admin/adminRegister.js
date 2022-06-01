const bcript = require('bcryptjs');
const Admin = require('../../models/adimin');
const validate = require('email-validator');

exports.post = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];
  if (!email || !password) {
    errors.push('Credencias invalidas');
  }

  if (String(password).length < 5 || String(password).length > 50) {
    errors.push('Password presisa ter de 5 a 50 caracteres!!');
  }

  if (validate.validate(String(email))) {
    let emailDb = await Admin.findOne({ email });
    if (emailDb) {
      errors.push('Email Invalido');
    }
  } else {
    errors.push('Email Invalido');
  }

  if (errors.length > 0) {
    return res.status(401).json({ Erros: errors })
  } else {
    try {
      const adim = {
        email,
        password: bcript.hashSync(String(password), 10),
      }
      return res.json({ adm: 'true', adim })
    } catch (error) {
      res.json(null)
    }

  }
}