
# 📋 Sistema de Gerenciamento de Tarefas – SAEP

## 📌 Sobre o Projeto

O Sistema de Gerenciamento de Tarefas foi desenvolvido como parte da atividade SAEP do curso Técnico em Desenvolvimento de Sistemas do SENAI.

O objetivo do projeto é facilitar o cadastro, a organização e o acompanhamento de tarefas, permitindo que os usuários sejam cadastrados e que as atividades sejam organizadas por setor, prioridade e status.

---

## 🚀 Funcionalidades

### 👤 Usuários
- Cadastrar usuários.
- Informar nome e e-mail.
- Validar os campos obrigatórios.
- Listar usuários cadastrados.

### 📝 Tarefas
- Cadastrar tarefas.
- Informar descrição e setor.
- Vincular tarefas aos usuários.
- Definir prioridade.
- Editar tarefas.
- Excluir tarefas.

### 📊 Gerenciamento
- Visualizar tarefas cadastradas.
- Organizar tarefas por status.
- Alterar o status das tarefas.
- Identificar o responsável por cada tarefa.

### Status das tarefas

| Status | Descrição |
|---|---|
| A Fazer | Tarefa que ainda será iniciada. |
| Fazendo | Tarefa em andamento. |
| Pronto | Tarefa concluída. |

### Prioridades

| Prioridade | Descrição |
|---|---|
| Baixa | Pouca urgência. |
| Média | Urgência intermediária. |
| Alta | Alta urgência. |

---

## 🛠️ Tecnologias Utilizadas

**Front-end**
- HTML5
- CSS3
- JavaScript

**Back-end**
- Node.js
- Express
- CORS

**Banco de Dados**
- MySQL
- Prisma ORM

---

## 📂 Estrutura do Projeto

```text
SAEP-1/
│
├── api/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── data/
│   │   ├── routes/
│   │   └── service/
│   ├── server.js
│   └── package.json
│
├── doc/
│   └── julianopls.drawio.png.png
│
├── prints/
│   ├── home.png
│   ├── usuario.png
│   ├── usuarioPRONTO.png
│   ├── tarefas.png
│   ├── Afazer.png
│   ├── fazendo.png
│   ├── pronto.png
│   └── tarefaPRONTO.png
│
└── web/
    ├── index.html
    ├── script.js
    └── style.css
```

---

## 💻 Como Executar o Projeto

### 1. Pré-requisitos

- Node.js
- MySQL
- Visual Studio Code

### 2. Clonar o Repositório

```bash
git clone URL_DO_SEU_REPOSITORIO
```

Entre na pasta:

```bash
cd SAEP-1
```

### 3. Instalar as Dependências

```bash
cd api
npm install
```

### 4. Configurar o Banco de Dados

Crie um banco de dados no MySQL.

Crie um arquivo `.env` dentro da pasta `api`:

```env
DATABASE_URL="mysql://USUARIO:SENHA@localhost:3306/NOME_DO_BANCO"
```

Substitua os dados pelas informações do seu banco.

### 5. Configurar o Prisma

```bash
npx prisma generate
```

```bash
npx prisma db push
```

### 6. Iniciar o Servidor

```bash
npm run dev
```

Ou:

```bash
npm start
```

### 7. Acessar o Sistema

Abra o navegador:

```text
http://localhost:3000
```

---

## 🔗 Rotas da API

### Usuários

| Método | Rota | Função |
|---|---|---|
| GET | `/api/usuarios` | Listar usuários |
| POST | `/api/usuarios` | Cadastrar usuário |

### Tarefas

| Método | Rota | Função |
|---|---|---|
| GET | `/api/tarefas` | Listar tarefas |
| GET | `/api/tarefas/:id` | Buscar tarefa por ID |
| POST | `/api/tarefas` | Cadastrar tarefa |
| PUT | `/api/tarefas/:id` | Atualizar tarefa |
| PATCH | `/api/tarefas/:id/status` | Alterar status |
| DELETE | `/api/tarefas/:id` | Excluir tarefa |

---

## 🗄️ Banco de Dados

O sistema utiliza MySQL com Prisma ORM.

### Entidade: Usuário

| Campo | Tipo |
|---|---|
| id | Int |
| nome | String |
| email | String |

### Entidade: Tarefa

| Campo | Tipo |
|---|---|
| id | Int |
| idUsuario | Int |
| descricao | String |
| setor | String |
| prioridade | Enum |
| dataCadastro | DateTime |
| status | Enum |

O relacionamento entre as entidades permite que um usuário possua várias tarefas.

---

## 🖥️ Telas do Sistema

### 1. Tela Inicial

![Tela inicial](prints/home.png)

### 2. Cadastro de Usuários

![Cadastro de usuários](prints/usuario.png)

### 3. Usuário Cadastrado

![Usuário cadastrado](prints/usuarioPRONTO.png)

### 4. Cadastro de Tarefas

![Cadastro de tarefas](prints/tarefas.png)

### 5. Tarefas a Fazer

![Tarefas a fazer](prints/Afazer.png)

### 6. Tarefas em Andamento

![Tarefas em andamento](prints/fazendo.png)

### 7. Tarefas Concluídas

![Tarefas concluídas](prints/pronto.png)

### 8. Tarefa Finalizada

![Tarefa pronta](prints/tarefaPRONTO.png)

---

## 📐 Diagrama do Projeto

![Diagrama do sistema](doc/julianopls.drawio.png.png)

---

## 🎯 Objetivo da Atividade

Desenvolver um sistema para gerenciamento de tarefas, aplicando conhecimentos de desenvolvimento web, integração entre front-end e back-end, criação de APIs, banco de dados relacional e organização de código.

O projeto permite colocar em prática conceitos de CRUD, validações, relacionamentos entre entidades e gerenciamento de informações.

---

## 👨‍💻 Desenvolvedor

**Juliano Rafael**

- Instituição: SENAI
- Curso: Técnico em Desenvolvimento de Sistemas
- Turma: 3A

---

## 📅 Projeto SAEP – 2026

Desenvolvido como atividade prática do curso Técnico em Desenvolvimento de Sistemas.
