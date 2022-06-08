const Categoria = require('../../models/categoria');

class CategoriaController {
  async get(req, res) {
    const categoriaDb = await Categoria.find();
    return res.json(categoriaDb);
  }

  async post(req, res) {
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

  async put(req, res) {
    const { categoriaUp } = req.params;
    const { categoria } = req.body;

    const categoriaDb = await Categoria.findOne({ categoriaUp });
    const categoriaDbValidate = await Categoria.findOne({ categoria });
    const errors = [];

    if (!categoriaDb || !categoria) {
      errors.push('Categoria Invalida!');
    }

    if (categoriaDbValidate) {
      errors.push('Categoria ja esiste!');
    }

    if (errors.length > 0) {
      return res.status(401).json({ Errors: errors })
    }

    try {
      await Categoria.updateOne({ categoriaDb }, { categoria });
      return res.json({ categoria })
    } catch (error) {
      return res.status(500).json(null);
    }

  }

  async delete(req, res) {
    const { categoriaDel } = req.params;
    const categoriaDb = Categoria.findOne({ categoriaDel });
    const errors = [];

    if (!categoriaDel || !categoriaDb) {
      errors.push('Categoria invalida')
    }

    if (errors.length > 0) {
      return res.status(401).json({ Errors: errors });
    }

    try {
      await Categoria.deleteOne({ categoriaDb })
      return res.json({ Delete: 'true' });
    } catch (error) {
      return res.status(500).json(null);
    }

  }
}


module.exports = new CategoriaController();
