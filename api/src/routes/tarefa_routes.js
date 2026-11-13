const router = require('express').Router();
const controller = require('../controllers/tarefa_controller');

router.get('/', controller.listar);
router.get('/:id', controller.buscar);
router.post('/', controller.criar);
router.put('/:id', controller.atualizar);
router.patch('/:id/status', controller.atualizarStatus);
router.delete('/:id', controller.excluir);

module.exports = router;
