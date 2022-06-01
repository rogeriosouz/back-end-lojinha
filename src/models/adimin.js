const mongoose = require('mongoose');

const Admin = mongoose.model('Admin', {
  email: String,
  password: String,
})

module.exports = Admin;