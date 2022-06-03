const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const validator = require("email-validator");
/* const jwt = require('jsonwebtoken'); */

exports.post = async (req, res) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email || !password) {
    errors.push('Credeciais invalidas!');
  }

  if (String(password).length < 5 || String(password).length > 50) {
    errors.push('password pressisar ter de 5 a 50 caracteres');
  }

  if (!validator.validate(String(email))) {
    errors.push('Email invalido!!');
  }

  const bd = await User.find();
  let passbcript = '';
  let errorBd = false;
  let id = '';
  let name = '';

  bd.map((item) => {
    if (email === item.email) {
      passbcript = item.password;
      errorBd = true;
      id = item._id;
      name = item.name;
    }
  });

  const bcripts = bcrypt.compareSync(String(password), String(passbcript));
  if (!errorBd || !bcripts) {
    errors.push('Credenciais invalidas!!')
  }

  if (errors.length > 0) {
    return res.status(401).json({ Erros: errors });
  } else {
    return res.json({ Login: "true", id, name });
  }

}