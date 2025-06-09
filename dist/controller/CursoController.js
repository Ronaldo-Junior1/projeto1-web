"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoController = void 0;
const CursoService_1 = require("../service/CursoService");
class CursoController {
    service = new CursoService_1.CursoService();
    listarCursos(req, res) {
        try {
            const cursos = this.service.listarCursos();
            res.status(200).json(cursos);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao listar cursos." });
        }
    }
}
exports.CursoController = CursoController;
