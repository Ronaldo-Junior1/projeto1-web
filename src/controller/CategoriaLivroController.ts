import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";

@Route("categoria-livro")
@Tags("Categoria-livro")
export class CategoriaLivroController {
    private service = new CategoriaLivroService();

    async cadastrarCategoriaLivro(req: Request, res:Response){
        try{
            const newCategoriaLivro = await this.service.insertCategoriaLivro(req.body)
            res.status(201).json(newCategoriaLivro)
        }catch(err){
            const message = err instanceof Error ? err.message : 'Erro ao criar a categoria de livro.'
             res.status(400).json(
                {
                    message: message
                }
            )
        }
    }

    listarCategoriasLivros(req: Request, res: Response): void {
        try {
            const categorias = this.service.listarCategoriasLivro();
            res.status(200).json(categorias);
        } catch (error: unknown) {
            res.status(500).json({ message: "Erro ao listar categorias de livros." });
        }
    }
}