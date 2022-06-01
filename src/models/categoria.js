const mongoose = require('mongoose');

const Categoria = mongoose.model('Categoria', {
  categoria: String,
})

module.exports = Categoria;