"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("./controller/UsuarioController");
const LivroController_1 = require("./controller/LivroController");
const EstoqueController_1 = require("./controller/EstoqueController");
const EmprestimoController_1 = require("./controller/EmprestimoController");
const CursoController_1 = require("./controller/CursoController");
const routes_1 = require("./route/routes");
const Swagger_1 = require("./config/Swagger");
const usuarioController = new UsuarioController_1.UsuarioController();
const livroController = new LivroController_1.LivroController();
const estoqueController = new EstoqueController_1.EstoqueController();
const emprestimoController = new EmprestimoController_1.EmprestimoController();
const cursoController = new CursoController_1.CursoController();
const app = (0, express_1.default)();
const PORT = process.env.PORT ?? 3090;
const BASE_URL = "/library";
app.use(express_1.default.json());
const apiRouter = express_1.default.Router();
(0, routes_1.RegisterRoutes)(apiRouter);
app.use('/api', apiRouter);
(0, routes_1.RegisterRoutes)(app);
(0, Swagger_1.setupSwagger)(app);
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
app.delete(`${BASE_URL}/livros/:isbn`, livroController.removerLivro.bind(livroController));
// --- Rotas de Estoque ---
app.post(`${BASE_URL}/estoque`, estoqueController.cadastrarExemplar.bind(estoqueController));
app.get(`${BASE_URL}/estoque`, estoqueController.listarExemplares.bind(estoqueController));
app.get(`${BASE_URL}/estoque/:codigo`, estoqueController.detalharExemplar.bind(estoqueController));
app.put(`${BASE_URL}/estoque/:codigo`, estoqueController.atualizarDisponibilidade.bind(estoqueController));
app.delete(`${BASE_URL}/estoque/:codigo`, estoqueController.removerExemplar.bind(estoqueController));
// --- Rotas de Empréstimos ---
console.log("Configurando rotas de empréstimos...");
app.post(`${BASE_URL}/emprestimos`, emprestimoController.realizarEmprestimo.bind(emprestimoController));
app.get(`${BASE_URL}/emprestimos`, emprestimoController.listarEmprestimos.bind(emprestimoController));
app.put(`${BASE_URL}/emprestimos/:id/devolucao`, emprestimoController.realizarDevolucao.bind(emprestimoController));
// --- Rotas de Catálogos ---
console.log("Configurando rotas de catálogos...");
//app.get(`${BASE_URL}/catalogos/categorias-usuario`, categoriaUsuarioController.listarCategoriasUsuarios.bind(categoriaUsuarioController));
// app.get(`${BASE_URL}/catalogos/categorias-livro`, categoriaLivroController.listarCategoriasLivros.bind(categoriaLivroController));
app.get(`${BASE_URL}/catalogos/cursos`, cursoController.listarCursos.bind(cursoController));
// app.post(`${BASE_URL}/catalogos/categoria-livro`, categoriaLivroController.cadastrarCategoriaLivro.bind(categoriaLivroController));
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
