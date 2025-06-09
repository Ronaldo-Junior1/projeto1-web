"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioService = void 0;
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
class CategoriaUsuarioService {
    repository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    listarCategoriasUsuario() {
        return this.repository.findAll();
    }
}
exports.CategoriaUsuarioService = CategoriaUsuarioService;
