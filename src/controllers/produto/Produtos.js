const Produto = require('../../models/produto');
const Admin = require('../../models/adimin');
const Categoria = require('../../models/categoria');

class Produtos {
  // method get
  async get(req, res) {
    const produto = await Produto.find();
    res.json(produto);
  }

  // method getOne get One
  async indexOne(req, res) {
    const { name } = req.params;
    const errors = [];

    if (!name) {
      errors.push('Name nao enviado!')
    }

    const produto = await Produto.findOne({ name });
    if (!produto) {
      errors.push('Name invalido!!')
    }

    if (errors.length > 0) {
      return res.status(401).json({ Errors: errors })
    }
    return res.json({ produto })
  }

  // method post create
  async post(req, res) {
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
        errors.push('Produto ja esistente!!')
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


  // method put update
  async put(req, res) {
    const { IdUpdate } = req.params;
    const newIDUpdate = IdUpdate.replace(':', '');
    const { name, prace, descricao, categoria } = req.body;
    const produtoAnt = await Produto.findById(newIDUpdate);
    const errors = [];

    if (!name || !prace || !descricao || !IdUpdate) {
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
        errors.push('Produto ja esistente!!')
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

      await Produto.updateOne(produtoAnt, produto);
      return res.json(produto);
    } catch (error) {
      res.json(null);
    }
  }

  async delete(req, res) {
    const { IdDell } = req.params;

    const newIdDell = String(IdDell).replace(":", "");

    const errors = [];

    if (!newIdDell) {
      errors.push('Name nao enviado!')
    }

    const produto = await Produto.findById(newIdDell);

    if (!produto) {
      errors.push('Name invalido!!')
    }

    if (errors.length > 0) {
      return res.status(401).json({ Errors: errors })
    }

    await Produto.deleteOne(produto);
    return res.json({ delete: 'true' });
  }
}

module.exports = new Produtos();
