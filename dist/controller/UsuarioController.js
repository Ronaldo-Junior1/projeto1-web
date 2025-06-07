"use strict";
// src/controller/UsuarioController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioController = void 0;
const UsuarioService_1 = require("../service/UsuarioService");
class UsuarioController {
    usuarioService = new UsuarioService_1.UsuarioService();
    cadastrarUsuario(req, res) {
        try {
            const novoUsuario = this.usuarioService.novoUsuario(req.body);
            res.status(201).json(novoUsuario);
        }
        catch (error) {
            let message = "Não foi possível cadastrar o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    listarUsuarios(req, res) {
        try {
            const usuarios = this.usuarioService.listarUsuarios();
            res.status(200).json(usuarios);
        }
        catch (error) {
            res.status(500).json({ message: "Ocorreu um erro ao buscar os usuários." });
        }
    }
    detalharUsuario(req, res) {
        try {
            const { cpf } = req.params;
            const usuario = this.usuarioService.buscarUsuarioPorCPF(cpf);
            if (!usuario) {
                res.status(404).json({ message: "Usuário não encontrado." });
            }
            res.status(200).json(usuario);
        }
        catch (error) {
            let message = "Ocorreu um erro ao buscar o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    atualizarUsuario(req, res) {
        try {
            const { cpf } = req.params;
            const dadosAtualizados = req.body;
            const usuarioAtualizado = this.usuarioService.atualizarUsuario(cpf, dadosAtualizados);
            res.status(200).json(usuarioAtualizado);
        }
        catch (error) {
            let message = "Não foi possível atualizar o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
    removerUsuario(req, res) {
        try {
            const { cpf } = req.params;
            this.usuarioService.removeUsuario(cpf);
            res.status(204).send();
        }
        catch (error) {
            let message = "Não foi possível remover o usuário.";
            if (error instanceof Error) {
                message = error.message;
            }
            res.status(400).json({ message });
        }
    }
}
exports.UsuarioController = UsuarioController;
