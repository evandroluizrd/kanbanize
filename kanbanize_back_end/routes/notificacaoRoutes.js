const express = require('express');
const router = express.Router();
const notificacaoController = require('../controllers/notificacaoController');

router.post('/', notificacaoController.criarNotificacao);
router.get('/:usuario_id', notificacaoController.listarNotificacoes);
router.patch('/:id', notificacaoController.marcarComoEnviada);

module.exports = router;