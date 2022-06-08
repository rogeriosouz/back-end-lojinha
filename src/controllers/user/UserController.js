const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const validator = require("email-validator");
const jwt = require('jsonwebtoken');

class UserController {

  async login(req, res) {
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
      const user = {
        id,
        name,
        email,
      }

      const token = jwt.sign({ userId: id },
        process.env.SECRET,
        { expiresIn: process.env.TOKEN_DAYS })

      return res.json({ token, user });
    }

  }

  async post(req, res) {
    const { name, email, password } = req.body;
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


    const emailBD = await User.findOne({ email });
    if (emailBD) {
      errors.push('Email Invalido!!');
    }

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

      const user = {
        id,
        name,
        email
      }

      return res.json({ user })
    } catch (error) {
      return res.status(501).json({ Errors: error });
    }
  }

  async put(req, res) {
    const userId = req.userId;

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


    const emailBD = await User.findOne({ email });
    if (emailBD) {
      errors.push('Email Invalido!!');
    }

    if (errors.length > 0) {
      return res.status(401).json({ Errors: errors });
    }

    const users = {
      name,
      email,
      password: bcrypt.hashSync(String(password), 10),
    }

    try {
      await User.updateOne({ emailBD }, users)
      return res.json({ user: { name, email } })
    } catch (error) {
      console.log(null)
    }
  }
}


module.exports = new UserController(); 