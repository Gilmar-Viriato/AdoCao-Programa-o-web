const express = require('express');
const router = express.Router();
const PublicacaoController = require('../controllers/PublicacaoController');
const auth = require('../middleware/auth');

router.post('/', auth, PublicacaoController.criar);
router.get('/', PublicacaoController.listar);
router.get('/minhas-publicacoes', auth, PublicacaoController.listarPublicacaoDoUsuario);
router.get('/:id', PublicacaoController.buscarPorId);
router.put('/:id', auth, PublicacaoController.atualizar);
router.delete('/:id', auth, PublicacaoController.deletar);

module.exports = router;
