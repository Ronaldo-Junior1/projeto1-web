"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const LivroService_1 = require("../service/LivroService");
class LivroController {
    livroService = new LivroService_1.LivroService();
    cadastrarLivro(req, res) {
        try {
            const novoLivro = this.livroService.novoLivro(req.body);
            res.status(201).json(novoLivro);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao cadastrar livro.";
            res.status(400).json({ message });
        }
    }
    listarLivros(req, res) {
        try {
            const livros = this.livroService.listarLivros();
            res.status(200).json(livros);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao listar livros.";
            res.status(500).json({ message });
        }
    }
    detalharLivro(req, res) {
        try {
            const { isbn } = req.params;
            const livro = this.livroService.buscarLivroPorIsbn(isbn);
            res.status(200).json(livro);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao buscar livro.";
            res.status(404).json({ message });
        }
    }
    atualizarLivro(req, res) {
        try {
            const { isbn } = req.params;
            const livroAtualizado = this.livroService.atualizarLivro(isbn, req.body);
            res.status(200).json(livroAtualizado);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao atualizar livro.";
            res.status(400).json({ message });
        }
    }
}
exports.LivroController = LivroController;
