const prisma = require('../data/prisma');

const PRIORIDADES = ['BAIXA', 'MEDIA', 'ALTA'];
const STATUS = ['A_FAZER', 'FAZENDO', 'PRONTO'];

function lerDados(body) {
  return {
    descricao: String(body.descricao || '').trim(),
    setor: String(body.setor || '').trim(),
    idUsuario: Number(body.idUsuario),
    prioridade: body.prioridade,
  };
}

function validar(d) {
  if (!d.descricao || !d.setor || !d.idUsuario || !PRIORIDADES.includes(d.prioridade)) {
    const erro = new Error('Preencha todos os campos.');
    erro.status = 400;
    throw erro;
  }
}

async function listar() {
  return prisma.tarefa.findMany({ include: { usuario: true }, orderBy: { id: 'asc' } });
}

async function buscar(id) {
  const tarefa = await prisma.tarefa.findUnique({ where: { id } });
  if (!tarefa) {
    const erro = new Error('Tarefa não encontrada.');
    erro.status = 404;
    throw erro;
  }
  return tarefa;
}

async function criar(body) {
  const dados = lerDados(body);
  validar(dados);
  return prisma.tarefa.create({ data: dados });
}

async function atualizar(id, body) {
  const dados = lerDados(body);
  validar(dados);
  await buscar(id);
  return prisma.tarefa.update({ where: { id }, data: dados });
}

async function atualizarStatus(id, status) {
  if (!STATUS.includes(status)) {
    const erro = new Error('Status inválido.');
    erro.status = 400;
    throw erro;
  }
  await buscar(id);
  return prisma.tarefa.update({ where: { id }, data: { status } });
}

async function excluir(id) {
  await prisma.tarefa.deleteMany({ where: { id } });
}

module.exports = { listar, buscar, criar, atualizar, atualizarStatus, excluir };
