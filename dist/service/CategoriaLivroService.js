"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepository_1 = require("../repository/CategoriaLivroRepository");
class CategoriaLivroService {
    repository = CategoriaLivroRepository_1.CategoriaLivroRepository.getInstance();
    async listarCategoriasLivro() {
        const categorias = await this.repository.findAll();
        console.log("Service - Filtrar Todos", categorias);
        return categorias;
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
