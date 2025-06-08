import express from "express";
import { UsuarioController } from "./controller/UsuarioController";
import { LivroController } from "./controller/LivroController";

const usuarioController = new UsuarioController();
const livroController = new LivroController();

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


app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));