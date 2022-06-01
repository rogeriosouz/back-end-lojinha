const Produto = require('../../models/produto');

exports.get = async (req, res) => {
  const { name } = req.params;
  const nameBD = String(name).replace(':', '');
  const errors = [];

  if (!nameBD) {
    errors.push('ID não enviado!!');
  }

  const bd = await Produto.find();
  let err = true;
  let produto = [];
  bd.map((item) => {
    if (item.name === nameBD) {
      err = false;
      produto = item;
    }
  });

  if (err) {
    errors.push('Produto invalido!!');
  }

  if (errors.length > 0) {
    return res.status(401).json({ Errors: errors });
  } else {
    return res.json(produto);
  }

}