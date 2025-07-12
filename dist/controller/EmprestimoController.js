"use strict";
// import { Request, Response } from "express";
// import { EmprestimoService } from "../service/EmprestimoService";
// export class EmprestimoController {
//     private emprestimoService = new EmprestimoService();
//     realizarEmprestimo(req: Request, res: Response): void {
//         try {
//             const novoEmprestimo = this.emprestimoService.novoEmprestimo(req.body);
//             res.status(201).json(novoEmprestimo);
//         } catch (error: unknown) {
//             const message = error instanceof Error ? error.message : "Erro ao registrar empréstimo.";
//             res.status(400).json({ message });
//         }
//     }
//     listarEmprestimos(req: Request, res: Response): void {
//         try {
//             const emprestimos = this.emprestimoService.listarEmprestimos();
//             res.status(200).json(emprestimos);
//         } catch (error: unknown) {
//             res.status(500).json({ message: "Erro ao listar empréstimos." });
//         }
//     }
//     realizarDevolucao(req: Request, res: Response): void {
//         try {
//             const emprestimo = this.emprestimoService.registrarDevolucao(Number(req.params.id));
//             res.status(200).json(emprestimo);
//         } catch (error: unknown) {
//             const message = error instanceof Error ? error.message : "Erro ao registrar devolução.";
//             res.status(400).json({ message });
//         }
//     }
// }
