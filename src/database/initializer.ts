import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";

const categoriaUsuarioRepository = CategoriaUsuarioRepository.getInstance();
const categoriaLivroRepository = CategoriaLivroRepository.getInstance();
const cursoRepository = CursoRepository.getInstance();
const usuarioRepository = UsuarioRepository.getInstance();
const livroRepository = LivroRepository.getInstance();
const estoqueRepository = EstoqueRepository.getInstance();
const emprestimoRepository = EmprestimoRepository.getInstance();

export async function inicializarTabelas(){
    await categoriaUsuarioRepository.createTable();
    await categoriaLivroRepository.createTable();
    await cursoRepository.createTable();
    await usuarioRepository.createTable();
    await livroRepository.createTable();
    await estoqueRepository.createTable();
    await emprestimoRepository.createTable();
}