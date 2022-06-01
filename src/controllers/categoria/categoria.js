const Categoria = require('../../models/categoria');

exports.post = async (req, res) => {
  const { categoria } = req.body;
  const erros = [];
  const categoriaDb = await Categoria.find();

  categoriaDb.map(item => {
    if (categoria === item.categoria) {
      erros.push('Categoria ja esitente!!');
    }
  })

  if (erros.length > 0) {
    return res.status(401).json({ Errors: erros });
  }

  const catego = {
    categoria
  }

  try {
    await Categoria.create(catego);
    return res.json(categoria);
  } catch (error) {
    return res.status(500).json(null);
  }

}

exports.get = async (req, res) => {
  const categoriaDb = await Categoria.find();
  return res.json(categoriaDb);
}