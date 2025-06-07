import express from "express";
import { UsuarioController } from "./controller/UsuarioController";

const usuarioController = new UsuarioController();

const app = express();

const PORT =  process.env.PORT ?? 3090;
const BASE_URL = "/library";

app.use(express.json());

console.log("Configurando rotas de usuários...");

// Rota para cadastrar um novo usuário 
app.post(`${BASE_URL}/usuarios`, usuarioController.cadastrarUsuario.bind(usuarioController));

// Rota para listar todos os usuários 
app.get(`${BASE_URL}/usuarios`, usuarioController.listarUsuarios.bind(usuarioController));

// Rota para buscar um usuário específico pelo CPF 
app.get(`${BASE_URL}/usuarios/:cpf`, usuarioController.detalharUsuario.bind(usuarioController));

// Rota para atualizar os dados de um usuário 
app.put(`${BASE_URL}/usuarios/:cpf`, usuarioController.atualizarUsuario.bind(usuarioController));

// Rota para remover um usuário 
app.delete(`${BASE_URL}/usuarios/:cpf`, usuarioController.removerUsuario.bind(usuarioController));


// Inicia o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));