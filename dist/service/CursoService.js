"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    repository = CursoRepository_1.CursoRepository.getInstance();
    async listarCursos() {
        const cursos = await this.repository.findAll();
        console.log("Service - Filtrar Todos", cursos);
        return cursos;
    }
}
exports.CursoService = CursoService;
