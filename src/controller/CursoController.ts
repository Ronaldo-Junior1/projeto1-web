import { Request, Response } from "express";
import { CursoService } from "../service/CursoService";

export class CursoController {
    private service = new CursoService();

    listarCursos(req: Request, res: Response): void {
        try {
            const cursos = this.service.listarCursos();
            res.status(200).json(cursos);
        } catch (error: unknown) {
            res.status(500).json({ message: "Erro ao listar cursos." });
        }
    }
}