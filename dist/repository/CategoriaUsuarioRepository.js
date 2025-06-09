"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const CategoriaUsuarioEntity_1 = require("../model/CategoriaUsuarioEntity");
class CategoriaUsuarioRepository {
    static instance;
    categorias = [];
    constructor() {
        this.categorias.push(new CategoriaUsuarioEntity_1.CategoriaUsuarioEntity(1, "Professor"));
        this.categorias.push(new CategoriaUsuarioEntity_1.CategoriaUsuarioEntity(2, "Aluno"));
        this.categorias.push(new CategoriaUsuarioEntity_1.CategoriaUsuarioEntity(3, "Bibliotecário"));
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    findAll() {
        return this.categorias;
    }
    findById(id) {
        return this.categorias.find(c => c.id === id);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
