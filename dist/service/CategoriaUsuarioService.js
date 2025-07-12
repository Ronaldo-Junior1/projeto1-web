"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    repository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    async listarCategoriasUsuario() {
        const categorias = await this.repository.findAll();
        console.log("Service - Filtrar Todos", categorias);
        return categorias;
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
