const express = require('express');
const router = express.Router();
const home = require('../controllers/home');

const Produtos = require('../controllers/produto/Produtos');

const adminRegister = require('../controllers/admin/adminRegister');
const adminLogin = require('../controllers/admin/adminLogin');

const CategoriaController = require('../controllers/categoria/CategoriaController');

const UserController = require('../controllers/user/UserController');

const ferifica = require('../middleware/validateTokenAdm');
const ferificaUser = require('../middleware/validateTokenUser');

// Home
router.get('/', home.get);

// User
router.post('/register', UserController.post);
router.post('/login', UserController.login);
router.put('/update/User/:name', ferificaUser, UserController.put);
router.get('/user/getUserRefres/:id', ferificaUser, UserController.getUserRefress);

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
router.get('/categoria', CategoriaController.get);
router.post('/categoria', ferifica, CategoriaController.post);
router.put('/categoria/:categoriaUp', ferifica, CategoriaController.put);
router.delete('/categoria/:categoriaDel', ferifica, CategoriaController.delete);

module.exports = router;