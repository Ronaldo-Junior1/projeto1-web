"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("./controller/UsuarioController");
const usuarioController = new UsuarioController_1.UsuarioController();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
const BASE_URL = "/library";
app.use(express_1.default.json());
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
