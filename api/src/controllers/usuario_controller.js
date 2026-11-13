const prisma = require('../data/prisma');

const emailOk = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

exports.listar = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({ orderBy: { nome: 'asc' } });
    res.json(usuarios);
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao listar usuários.' });
  }
};

exports.criar = async (req, res) => {
  try {
    const nome = String(req.body.nome || '').trim();
    const email = String(req.body.email || '').trim();
    if (!nome || !emailOk(email)) {
      return res.status(400).json({ erro: 'Preencha todos os campos com um e-mail válido.' });
    }
    const usuario = await prisma.usuario.create({ data: { nome, email } });
    res.status(201).json(usuario);
  } catch (e) {
    res.status(500).json({ erro: 'Erro ao cadastrar usuário.' });
  }
};
