const Produto = require('../../models/produto');
const Admin = require('../../models/adimin');
const Categoria = require('../../models/categoria');


exports.get = async (req, res) => {
  const produto = await Produto.find();
  res.json(produto);
}


exports.post = async (req, res) => {
  const { name, prace, descricao, categoria } = req.body;

  const errors = [];

  if (!name || !prace || !descricao) {
    errors.push('Credenciais invalidas!!');
  }

  if (typeof prace !== 'number') {
    errors.push('Error preço so em numero!!');
  }

  if (String(name).length < 5 || String(name).length > 50) {
    errors.push('name presisar ter de 5 a 50 caractere!!');
  }

  if (String(name).length < 5 || String(name).length > 250) {
    errors.push('Descriçao presisar ter de 5 a 250 caractere!!');
  }

  const db = await Produto.find();
  const categoriaDb = await Categoria.find();

  let esisterCategoria = false;
  categoriaDb.map((item) => {
    if (categoria === item.categoria) {
      esisterCategoria = true;
    }
  })

  if (!esisterCategoria) {
    errors.push('Categoria invalida!!')
  }

  db.map((item) => {
    if (String(name) === item.name) {
      errors.push('Produto ja esestente!!')
    }
  });

  if (errors.length > 0) {
    return res.json({ Errors: errors });
  }

  try {
    const produto = {
      name,
      prace,
      descricao,
      categoria
    }

    await Produto.create(produto);
    return res.json(produto);
  } catch (error) {
    res.json(null);
  }

}