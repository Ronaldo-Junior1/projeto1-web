"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroService = void 0;
const LivroEntity_1 = require("../model/entity/LivroEntity");
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class LivroService {
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    categoriaRepository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    async novoLivro(data) {
        const { titulo, isbn, autor, editora, edicao, categoria_id } = data;
        if (!titulo || !isbn || !autor || !editora || !edicao || !categoria_id) {
            throw new Error("Todos os campos são obrigatórios.");
        }
        try {
            await this.livroRepository.findByIsbn(isbn);
            throw new Error("ISBN já cadastrado.");
        }
        catch (error) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }
        try {
            await this.livroRepository.findByAutorEditoraEdicao(autor, editora, edicao);
            throw new Error("Já existe um livro com o mesmo autor, editora e edição.");
        }
        catch (error) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }
        await this.categoriaRepository.findById(categoria_id);
        const novoLivro = new LivroEntity_1.LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id);
        await this.livroRepository.insereLivro(novoLivro);
        return novoLivro;
    }
    async listarLivros() {
        return await this.livroRepository.findAll();
    }
    async buscarLivroPorIsbn(isbn) {
        return await this.livroRepository.findByIsbn(isbn);
    }
    async atualizarLivro(isbn, dadosAtualizados) {
        const livro = await this.buscarLivroPorIsbn(isbn);
        livro.titulo = dadosAtualizados.titulo ?? livro.titulo;
        livro.autor = dadosAtualizados.autor ?? livro.autor;
        livro.editora = dadosAtualizados.editora ?? livro.editora;
        livro.edicao = dadosAtualizados.edicao ?? livro.edicao;
        if (dadosAtualizados.categoria_id) {
            await this.categoriaRepository.findById(dadosAtualizados.categoria_id);
            livro.categoria_id = dadosAtualizados.categoria_id;
        }
        return await this.livroRepository.updateLivroPorIsbn(livro);
    }
    async removerLivro(isbn) {
        const livro = await this.buscarLivroPorIsbn(isbn);
        const todosOsExemplares = await this.estoqueRepository.findAllByLivroId(Number(livro.id));
        for (const exemplar of todosOsExemplares) {
            const emprestimoAtivo = await this.emprestimoRepository.findAtivoByEstoqueId(exemplar.id);
            if (emprestimoAtivo) {
                throw new Error(`Livro não pode ser removido. O exemplar de código ${exemplar.id} está emprestado.`);
            }
        }
        await this.livroRepository.removeLivroPorIsbn(isbn);
        for (const exemplar of todosOsExemplares) {
            await this.estoqueRepository.removeById(exemplar.id);
        }
    }
}
exports.LivroService = LivroService;
