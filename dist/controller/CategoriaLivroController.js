"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
class CategoriaLivroController {
    service = new CategoriaLivroService_1.CategoriaLivroService();
    listarCategoriasLivros(req, res) {
        try {
            const categorias = this.service.listarCategoriasLivro();
            res.status(200).json(categorias);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao listar categorias de livros." });
        }
    }
}
exports.CategoriaLivroController = CategoriaLivroController;
