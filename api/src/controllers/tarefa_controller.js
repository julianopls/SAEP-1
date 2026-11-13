const service = require('../service/tarefa_service');

function responderErro(res, e) {
  res.status(e.status || 500).json({ erro: e.status ? e.message : 'Erro interno no servidor.' });
}

exports.listar = async (req, res) => {
  try {
    res.json(await service.listar());
  } catch (e) { responderErro(res, e); }
};

exports.buscar = async (req, res) => {
  try {
    res.json(await service.buscar(Number(req.params.id)));
  } catch (e) { responderErro(res, e); }
};

exports.criar = async (req, res) => {
  try {
    res.status(201).json(await service.criar(req.body));
  } catch (e) { responderErro(res, e); }
};

exports.atualizar = async (req, res) => {
  try {
    res.json(await service.atualizar(Number(req.params.id), req.body));
  } catch (e) { responderErro(res, e); }
};

exports.atualizarStatus = async (req, res) => {
  try {
    res.json(await service.atualizarStatus(Number(req.params.id), req.body.status));
  } catch (e) { responderErro(res, e); }
};

exports.excluir = async (req, res) => {
  try {
    await service.excluir(Number(req.params.id));
    res.status(204).end();
  } catch (e) { responderErro(res, e); }
};
