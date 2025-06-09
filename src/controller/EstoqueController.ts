import { Request, Response } from "express";
import { EstoqueService } from "../service/EstoqueService";

export class EstoqueController {
    private estoqueService = new EstoqueService();

    cadastrarExemplar(req: Request, res: Response): void {
        try {
            const novoExemplar = this.estoqueService.novoExemplar(req.body);
            res.status(201).json(novoExemplar);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao cadastrar exemplar.";
            res.status(400).json({ message });
        }
    }

    listarExemplares(req: Request, res: Response): void {
        try {
            const exemplares = this.estoqueService.listarEstoque();
            res.status(200).json(exemplares);
        } catch (error: unknown) {
            res.status(500).json({ message: "Erro ao listar exemplares." });
        }
    }

    detalharExemplar(req: Request, res: Response): void {
        try {
            const exemplar = this.estoqueService.buscarPorCodigo(Number(req.params.codigo));
            res.status(200).json(exemplar);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao buscar exemplar.";
            res.status(404).json({ message });
        }
    }

    atualizarDisponibilidade(req: Request, res: Response): void {
        try {
            const { codigo } = req.params;
            const { quantidade } = req.body;
            const exemplar = this.estoqueService.atualizarQuantidade(Number(codigo), quantidade);
            res.status(200).json(exemplar);
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao atualizar exemplar.";
            res.status(400).json({ message });
        }
    }

    removerExemplar(req: Request, res: Response): void {
        try {
            this.estoqueService.removerExemplar(Number(req.params.codigo));
            res.status(204).send();
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Erro ao remover exemplar.";
            res.status(400).json({ message });
        }
    }
}