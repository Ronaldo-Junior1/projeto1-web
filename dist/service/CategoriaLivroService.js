"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroService = void 0;
const CategoriaLivroRepositoryt_1 = require("../repository/CategoriaLivroRepositoryt");
class CategoriaLivroService {
    repository = CategoriaLivroRepositoryt_1.CategoriaLivroRepository.getInstance();
    listarCategoriasLivro() {
        return this.repository.findAll();
    }
}
exports.CategoriaLivroService = CategoriaLivroService;
