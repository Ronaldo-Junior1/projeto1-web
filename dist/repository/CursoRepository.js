"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const CursoEntity_1 = require("../model/CursoEntity");
class CursoRepository {
    static instance;
    cursos = [];
    constructor() {
        this.cursos.push(new CursoEntity_1.CursoEntity(1, "ADS"));
        this.cursos.push(new CursoEntity_1.CursoEntity(2, "Pedagogia"));
        this.cursos.push(new CursoEntity_1.CursoEntity(3, "Administracao"));
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    findAll() {
        return this.cursos;
    }
    findById(id) {
        return this.cursos.find(c => c.id === id);
    }
}
exports.CursoRepository = CursoRepository;
