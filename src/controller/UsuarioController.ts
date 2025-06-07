// src/controller/UsuarioController.ts

import { Request, Response } from "express";
import { UsuarioService } from "../service/UsuarioService";

export class UsuarioController {
    private usuarioService = new UsuarioService();

    cadastrarUsuario(req: Request, res: Response): void {
        try {
            const novoUsuario = this.usuarioService.novoUsuario(req.body);
            res.status(201).json(novoUsuario);
        } catch (error: unknown) {
            let message = "Não foi possível cadastrar o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }

    listarUsuarios(req: Request, res: Response): void {
        try {
            const usuarios = this.usuarioService.listarUsuarios();
            res.status(200).json(usuarios);
        } catch (error: unknown) {
            res.status(500).json({ message: "Ocorreu um erro ao buscar os usuários." });
        }
    }

    detalharUsuario(req: Request, res: Response): void {
        try {
            const { cpf } = req.params;
            const usuario = this.usuarioService.buscarUsuarioPorCPF(cpf);
            if (!usuario) {
                res.status(404).json({ message: "Usuário não encontrado." });
            }
            res.status(200).json(usuario);
        } catch (error: unknown) {
             let message = "Ocorreu um erro ao buscar o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }

    atualizarUsuario(req: Request, res: Response): void {
        try {
            const { cpf } = req.params;
            const dadosAtualizados = req.body;
            const usuarioAtualizado = this.usuarioService.atualizarUsuario(cpf, dadosAtualizados);
            res.status(200).json(usuarioAtualizado);
        } catch (error: unknown) {
             let message = "Não foi possível atualizar o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }

    removerUsuario(req: Request, res: Response): void {
        try {
            const { cpf } = req.params;
            this.usuarioService.removeUsuario(cpf);
            res.status(204).send();
        } catch (error: unknown) {
             let message = "Não foi possível remover o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
}