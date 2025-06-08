import { Request, Response } from "express";
import { LivroService } from "../service/LivroService";

export class LivroController {
    private livroService = new LivroService();

    cadastrarLivro(req: Request, res: Response): void {
        try {
            const novoLivro = this.livroService.novoLivro(req.body);
            res.status(201).json(novoLivro);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao cadastrar livro.";
            res.status(400).json({ message });
        }
    }

    listarLivros(req: Request, res: Response): void {
        try {
            const livros = this.livroService.listarLivros();
            res.status(200).json(livros);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao listar livros.";
            res.status(500).json({ message });
        }
    }

    detalharLivro(req: Request, res: Response): void {
        try {
            const { isbn } = req.params;
            const livro = this.livroService.buscarLivroPorIsbn(isbn);
            res.status(200).json(livro);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao buscar livro.";
            res.status(404).json({ message });
        }
    }

    atualizarLivro(req: Request, res: Response): void {
        try {
            const { isbn } = req.params;
            const livroAtualizado = this.livroService.atualizarLivro(isbn, req.body);
            res.status(200).json(livroAtualizado);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao atualizar livro.";
            res.status(400).json({ message });
        }
    }

}