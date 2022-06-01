const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const validator = require("email-validator");

exports.post = async (req, res) => {
  const { email, password, name } = req.body;
  const errors = [];

  if (!email || !password || !name) {
    errors.push('Credeciais invalidas!');
  }

  if (String(name).length < 3 || String(name).length > 50) {
    errors.push('Name presisa ter de 3 a 50 caracteres!!');
  }

  if (String(password).length < 5 || String(password).length > 50) {
    errors.push('password pressisar ter de 5 a 50 caracteres')
  }

  if (!validator.validate(String(email))) {
    errors.push('Email invalido!!')
  }

  const emailBD = await User.find();
  emailBD.map((item) => {
    if (email === item.email) {
      errors.push('Email Invalido!!');
    }
  });

  if (errors.length > 0) {
    return res.status(401).json({ Errors: errors });
  }

  try {
    let usuario = {
      name,
      email,
      password: bcrypt.hashSync(String(password), 10),
    }

    await User.create(usuario);

    let id = '';
    const bd = (await User.find()).map((item) => {
      if (email === item.email) {
        id = item._id;
      }
    });

    return res.json({ Register: usuario, id })
  } catch (error) {
    return res.status(501).json({ Errors: error });
  }

}