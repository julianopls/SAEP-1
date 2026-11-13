const express = require('express');
const cors = require('cors');
const path = require('path');

const usuarioRoutes = require('./src/routes/usuario_routes');
const tarefaRoutes = require('./src/routes/tarefa_routes');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/usuarios', usuarioRoutes);
app.use('/api/tarefas', tarefaRoutes);


app.use(express.static(path.join(__dirname, '..', 'web')));

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
