"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoService = void 0;
const CursoRepository_1 = require("../repository/CursoRepository");
class CursoService {
    repository = CursoRepository_1.CursoRepository.getInstance();
    listarCursos() {
        return this.repository.findAll();
    }
}
exports.CursoService = CursoService;
