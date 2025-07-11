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
    async insertCategoriaUsuario(data) {
        if (!data.nome) {
            throw new Error('Favor informar o nome');
        }
        return this.repository.insertCategoriaUsuario(data.nome);
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
