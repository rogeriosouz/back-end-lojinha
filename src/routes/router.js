const express = require('express');
const router = express.Router();
const home = require('../controllers/home');

const Produtos = require('../controllers/produto/Produtos');

const adminRegister = require('../controllers/admin/adminRegister');
const adminLogin = require('../controllers/admin/adminLogin');

const categoria = require('../controllers/categoria/categoria');

const UserController = require('../controllers/user/UserController');

const ferifica = require('../middleware/postAdmin');

const ferificaUser = require('../middleware/postUser');

// Home
router.get('/', home.get);

// User
router.post('/register', UserController.post);
router.get('/login', UserController.login);
router.put('/update/User', ferificaUser, UserController.put);

// adminRegister 
router.post('/adminregister', adminRegister.post);
router.post('/adminlogin', adminLogin.post);

// produto
router.get('/produto', Produtos.get);
router.post('/produto', ferifica, Produtos.post);
router.get('/produto/:name', Produtos.indexOne);
router.put('/produto/:nameUp', ferifica, Produtos.put);
router.delete('/produto/:nameDel', ferifica, Produtos.delete);

// Categoria
router.get('/categoria', categoria.get);
router.post('/categoria', ferifica, categoria.post);

module.exports = router;