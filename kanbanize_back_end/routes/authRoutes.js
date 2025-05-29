const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/cadastro', authController.cadastrar);
router.patch('/redefinir-senha', authController.redefinirSenha);

module.exports = router;
