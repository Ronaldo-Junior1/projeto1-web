import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/CategoriaLivroService";

export class CategoriaLivroController {
    private service = new CategoriaLivroService();

    listarCategoriasLivros(req: Request, res: Response): void {
        try {
            const categorias = this.service.listarCategoriasLivro();
            res.status(200).json(categorias);
        } catch (error: unknown) {
            res.status(500).json({ message: "Erro ao listar categorias de livros." });
        }
    }
}