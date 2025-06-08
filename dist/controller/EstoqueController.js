"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueController = void 0;
const EstoqueService_1 = require("../service/EstoqueService");
class EstoqueController {
    estoqueService = new EstoqueService_1.EstoqueService();
    cadastrarExemplar(req, res) {
        try {
            const novoExemplar = this.estoqueService.novoExemplar(req.body);
            res.status(201).json(novoExemplar);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao cadastrar exemplar.";
            res.status(400).json({ message });
        }
    }
    listarExemplares(req, res) {
        try {
            const exemplares = this.estoqueService.listarEstoque();
            res.status(200).json(exemplares);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao listar exemplares." });
        }
    }
    detalharExemplar(req, res) {
        try {
            const exemplar = this.estoqueService.buscarPorCodigo(Number(req.params.codigo));
            res.status(200).json(exemplar);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao buscar exemplar.";
            res.status(404).json({ message });
        }
    }
    atualizarDisponibilidade(req, res) {
        try {
            const { codigo } = req.params;
            const exemplar = this.estoqueService.atualizarEstoque(Number(codigo), req.body);
            res.status(200).json(exemplar);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao atualizar exemplar.";
            res.status(400).json({ message });
        }
    }
}
exports.EstoqueController = EstoqueController;
