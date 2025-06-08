"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("./controller/UsuarioController");
const LivroController_1 = require("./controller/LivroController");
const EstoqueController_1 = require("./controller/EstoqueController");
const usuarioController = new UsuarioController_1.UsuarioController();
const livroController = new LivroController_1.LivroController();
const estoqueController = new EstoqueController_1.EstoqueController();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
const BASE_URL = "/library";
app.use(express_1.default.json());
// --- Rotas de Usuários ---
app.post(`${BASE_URL}/usuarios`, usuarioController.cadastrarUsuario.bind(usuarioController));
app.get(`${BASE_URL}/usuarios`, usuarioController.listarUsuarios.bind(usuarioController));
app.get(`${BASE_URL}/usuarios/:cpf`, usuarioController.detalharUsuario.bind(usuarioController));
app.put(`${BASE_URL}/usuarios/:cpf`, usuarioController.atualizarUsuario.bind(usuarioController));
app.delete(`${BASE_URL}/usuarios/:cpf`, usuarioController.removerUsuario.bind(usuarioController));
// --- Rotas de Livros ---
app.post(`${BASE_URL}/livros`, livroController.cadastrarLivro.bind(livroController));
app.get(`${BASE_URL}/livros`, livroController.listarLivros.bind(livroController));
app.get(`${BASE_URL}/livros/:isbn`, livroController.detalharLivro.bind(livroController));
app.put(`${BASE_URL}/livros/:isbn`, livroController.atualizarLivro.bind(livroController));
// --- Rotas de Estoque ---
app.post(`${BASE_URL}/estoque`, estoqueController.cadastrarExemplar.bind(estoqueController));
app.get(`${BASE_URL}/estoque`, estoqueController.listarExemplares.bind(estoqueController));
app.get(`${BASE_URL}/estoque/:codigo`, estoqueController.detalharExemplar.bind(estoqueController));
app.put(`${BASE_URL}/estoque/:codigo`, estoqueController.atualizarDisponibilidade.bind(estoqueController));
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
