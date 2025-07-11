import express from "express";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";
import { EstoqueController } from "./controller/EstoqueController";
import { EmprestimoController } from "./controller/EmprestimoController";
import { CategoriaLivroController } from "./controller/CategoriaLivroController";
import { CategoriaUsuarioController } from "./controller/CategoriaUsuarioController";
import { CursoController } from "./controller/CursoController";
import { RegisterRoutes } from './route/routes';
import { setupSwagger } from "./config/Swagger";

const usuarioController = new UsuarioController();
const livroController = new LivroController();
const estoqueController = new EstoqueController();
const emprestimoController = new EmprestimoController();
const categoriaLivroController = new CategoriaLivroController();
const categoriaUsuarioController = new CategoriaUsuarioController();
const cursoController = new CursoController();

const app = express();

const PORT =  process.env.PORT ?? 3090;
const BASE_URL = "/library";

app.use(express.json());

const apiRouter = express.Router();
RegisterRoutes(apiRouter);


app.use('/api', apiRouter);

RegisterRoutes(app);

setupSwagger(app);

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