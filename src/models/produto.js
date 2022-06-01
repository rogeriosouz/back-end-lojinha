const mongoose = require('mongoose');

const Produto = mongoose.model('Produto', {
  name: String,
  prace: Number,
  descricao: String,
  categoria: Object,
})

module.exports = Produto;