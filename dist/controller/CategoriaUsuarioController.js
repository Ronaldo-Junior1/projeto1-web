"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
class CategoriaUsuarioController {
    service = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    listarCategoriasUsuarios(req, res) {
        try {
            const categorias = this.service.listarCategoriasUsuario();
            res.status(200).json(categorias);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao listar categorias de usuário." });
        }
    }
}
exports.CategoriaUsuarioController = CategoriaUsuarioController;
