const express = require('express');
const { v4: uuidv4 } = require('uuid'); // Importa a função uuidv4 para gerar IDs únicos
const app = express();
const port = 3000;

app.use(express.json());

const usuarios = [];

app.get('/', (req, res) => {
  res.send('Seja bem vindo a minha REST API');
});

app.get('/usuarios', (req, res) => {
  res.json(usuarios);
});

//Cria novo usuário
app.post('/usuarios', (req, res) => {
  const novoUsuario = {
    id: uuidv4(), // Gere um ID único para o novo usuário
    nome: req.body.nome, // Supondo que o corpo da requisição contenha o nome do usuário
  };
  usuarios.push(novoUsuario);
  res.status(201).json({ message: 'Usuário adicionado com sucesso' });
});

// Rota que deleta novo usuário
app.delete('/usuarios/:id', (req, res) => {
  const idUsuarioParaExcluir = req.params.id;
  const indice = usuarios.findIndex(usuario => usuario.id === idUsuarioParaExcluir);

  if (indice === -1) {
    res.status(404).json({ message: 'Usuário não encontrado' });
  } else {
    usuarios.splice(indice, 1);
    res.json({ message: 'Usuário excluído com sucesso' });
  }
});

// Pegar usuário Unico
app.get('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id;
  const usuario = usuarios.find(usuario => usuario.id === idUsuario)

  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado' });
  } else {
    res.json(usuario)
  }
});


//Altera informalções de usuário:

app.patch('/usuarios/:id', (req, res) => {
  const idUsuario = req.params.id;
  const dadosAtualizados = req.body;

  const usuario = usuarios.find(usuario => usuario.id === idUsuario);
  if (!usuario) {
    res.status(404).json({ message: 'Usuário não encontrado' });
  } else {
    Object.assign(usuario, dadosAtualizados);
    res.json({ message: 'Usuário atualizado com sucesso', usuario });
  }
});


//Imprimi rota no terminal
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
