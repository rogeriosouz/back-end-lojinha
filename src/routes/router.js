const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const register = require('../controllers/user/register');
const login = require('../controllers/user/login');
const produto = require('../controllers/produto/produto');
const produtoUneGet = require('../controllers/produto/produtoUneGet');
const adminRegister = require('../controllers/admin/adminRegister');
const adminLogin = require('../controllers/admin/adminLogin');
const categoria = require('../controllers/categoria/categoria');
const ferifica = require('../middleware/postAdmin');

// Home
router.get('/', home.get);

// register
router.post('/register', register.post);
router.post('/login', login.post);

// adminRegister 
router.post('/adminregister', adminRegister.post);
router.post('/adminlogin', adminLogin.post);

// produto
router.get('/produto', produto.get);
router.post('/produto', ferifica, produto.post);
router.get('/produto/:name', produtoUneGet.get);

// Categoria
router.get('/categoria', categoria.get);
router.post('/categoria', ferifica, categoria.post);

module.exports = router;