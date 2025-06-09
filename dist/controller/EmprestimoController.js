"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoController = void 0;
const EmprestimoService_1 = require("../service/EmprestimoService");
class EmprestimoController {
    emprestimoService = new EmprestimoService_1.EmprestimoService();
    realizarEmprestimo(req, res) {
        try {
            const novoEmprestimo = this.emprestimoService.novoEmprestimo(req.body);
            res.status(201).json(novoEmprestimo);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao registrar empréstimo.";
            res.status(400).json({ message });
        }
    }
    listarEmprestimos(req, res) {
        try {
            const emprestimos = this.emprestimoService.listarEmprestimos();
            res.status(200).json(emprestimos);
        }
        catch (error) {
            res.status(500).json({ message: "Erro ao listar empréstimos." });
        }
    }
    realizarDevolucao(req, res) {
        try {
            const emprestimo = this.emprestimoService.registrarDevolucao(Number(req.params.id));
            res.status(200).json(emprestimo);
        }
        catch (error) {
            const message = error instanceof Error ? error.message : "Erro ao registrar devolução.";
            res.status(400).json({ message });
        }
    }
}
exports.EmprestimoController = EmprestimoController;
