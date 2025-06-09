import { Request, Response } from "express";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";

export class CategoriaUsuarioController {
    private service = new CategoriaUsuarioService();

    listarCategoriasUsuarios(req: Request, res: Response): void {
        try {
            const categorias = this.service.listarCategoriasUsuario();
            res.status(200).json(categorias);
        } catch (error: unknown) {
            res.status(500).json({ message: "Erro ao listar categorias de usuário." });
        }
    }
}