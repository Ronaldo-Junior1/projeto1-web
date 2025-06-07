"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
class CursoRepository {
    static instance;
    cursos = [
        { id: 1, nome: "ADS" },
        { id: 2, nome: "Pedagogia" },
        { id: 3, nome: "Administracao" }
    ];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    findById(id) {
        return this.cursos.find(c => c.id === id);
    }
}
exports.CursoRepository = CursoRepository;
