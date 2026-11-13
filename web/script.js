const API = location.port === '3000' ? '' : 'http://localhost:3000';

const STATUS = { A_FAZER: 'A Fazer', FAZENDO: 'Fazendo', PRONTO: 'Pronto' };
const PRIORIDADE = { BAIXA: 'Baixa', MEDIA: 'Média', ALTA: 'Alta' };

let editandoId = null;

const $ = (id) => document.getElementById(id);

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function mostrarTela(nome) {
  document.querySelectorAll('.tela').forEach((t) => t.classList.add('oculta'));
  $('tela-' + nome).classList.remove('oculta');
}

document.querySelectorAll('nav a').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tela = link.dataset.tela;
    if (tela === 'gerenciar') abrirGerenciar();
    else if (tela === 'tarefas') abrirCadastroTarefa();
    else abrirUsuarios();
  });
});

async function abrirGerenciar() {
  mostrarTela('gerenciar');
  const tarefas = await (await fetch(API + '/api/tarefas')).json();
  Object.keys(STATUS).forEach((s) => ($(s).innerHTML = ''));

  tarefas.forEach((t) => {
    const opcoes = Object.entries(STATUS)
      .map(([k, v]) => `<option value="${k}" ${k === t.status ? 'selected' : ''}>${v}</option>`)
      .join('');

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <b>Descrição:</b> ${esc(t.descricao)}<br>
      <b>Setor:</b> ${esc(t.setor)}<br>
      <b>Prioridade:</b> ${PRIORIDADE[t.prioridade]}<br>
      <b>Vinculado a:</b> ${esc(t.usuario.nome)}<br>
      <div class="acoes">
        <button type="button" onclick="editarTarefa(${t.id})">Editar</button>
        <button type="button" onclick="excluirTarefa(${t.id})">Excluir</button>
      </div>
      <div class="acoes">
        <select id="status-${t.id}">${opcoes}</select>
        <button type="button" onclick="alterarStatus(${t.id})">Alterar Status</button>
      </div>`;
    $(t.status).appendChild(card);
  });
}

async function excluirTarefa(id) {
  if (!confirm('Deseja realmente excluir esta tarefa?')) return;
  await fetch(`${API}/api/tarefas/${id}`, { method: 'DELETE' });
  abrirGerenciar();
}

async function alterarStatus(id) {
  const status = $('status-' + id).value;
  await fetch(`${API}/api/tarefas/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  abrirGerenciar();
}

async function editarTarefa(id) {
  const resp = await fetch(`${API}/api/tarefas/${id}`);
  if (!resp.ok) return abrirGerenciar();
  abrirCadastroTarefa(await resp.json());
}

function abrirUsuarios() {
  $('form-usuario').reset();
  $('erro-usuario').style.display = 'none';
  mostrarTela('usuarios');
}

$('form-usuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('erro-usuario').style.display = 'none';

  const resp = await fetch(API + '/api/usuarios', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: $('nome').value, email: $('email').value }),
  });

  if (resp.ok) {
    alert('cadastro concluído com sucesso');
    $('form-usuario').reset();
  } else {
    $('erro-usuario').textContent = (await resp.json()).erro;
    $('erro-usuario').style.display = 'block';
  }
});

async function carregarUsuarios() {
  const usuarios = await (await fetch(API + '/api/usuarios')).json();
  $('idUsuario').innerHTML = '<option value="">Selecione</option>';
  usuarios.forEach((u) => {
    const op = document.createElement('option');
    op.value = u.id;
    op.textContent = u.nome;
    $('idUsuario').appendChild(op);
  });
}

async function abrirCadastroTarefa(tarefa = null) {
  editandoId = tarefa ? tarefa.id : null;
  $('erro-tarefa').style.display = 'none';
  $('form-tarefa').reset();
  await carregarUsuarios();

  if (tarefa) {
    $('descricao').value = tarefa.descricao;
    $('setor').value = tarefa.setor;
    $('idUsuario').value = tarefa.idUsuario;
    $('prioridade').value = tarefa.prioridade;
  }
  mostrarTela('tarefas');
}

$('form-tarefa').addEventListener('submit', async (e) => {
  e.preventDefault();
  $('erro-tarefa').style.display = 'none';

  const resp = await fetch(editandoId ? `${API}/api/tarefas/${editandoId}` : API + '/api/tarefas', {
    method: editandoId ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      descricao: $('descricao').value,
      setor: $('setor').value,
      idUsuario: $('idUsuario').value,
      prioridade: $('prioridade').value,
    }),
  });

  if (resp.ok) {
    alert('cadastro concluído com sucesso');
    if (editandoId) abrirGerenciar();
    else $('form-tarefa').reset();
  } else {
    $('erro-tarefa').textContent = (await resp.json()).erro;
    $('erro-tarefa').style.display = 'block';
  }
});

abrirGerenciar();
