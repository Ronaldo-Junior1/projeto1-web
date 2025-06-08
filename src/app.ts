import express from "express";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";
import { EstoqueController } from "./controller/EstoqueController";

const usuarioController = new UsuarioController();
const livroController = new LivroController();
const estoqueController = new EstoqueController();

const app = express();

const PORT =  process.env.PORT ?? 3090;
const BASE_URL = "/library";

app.use(express.json());

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