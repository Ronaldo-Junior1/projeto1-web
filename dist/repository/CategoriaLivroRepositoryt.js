"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivroEntity_1 = require("../model/entity/CategoriaLivroEntity");
class CategoriaLivroRepository {
    static instance;
    categorias = [];
    constructor() {
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(1, "Computação"));
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(2, "Letras"));
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(3, "Gestão"));
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(4, "Romance"));
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
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
exports.CategoriaLivroRepository = CategoriaLivroRepository;
