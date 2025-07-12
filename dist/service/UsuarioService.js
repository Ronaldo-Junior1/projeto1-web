"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioService = void 0;
const StatusUsuario_1 = require("../model/enum/StatusUsuario");
const UsuarioEntity_1 = require("../model/entity/UsuarioEntity");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const CategoriaUsuarioRepository_1 = require("../repository/CategoriaUsuarioRepository");
const CursoRepository_1 = require("../repository/CursoRepository");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
class UsuarioService {
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    categoriaRepository = CategoriaUsuarioRepository_1.CategoriaUsuarioRepository.getInstance();
    cursoRepository = CursoRepository_1.CursoRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    async novoUsuario(data) {
        const { nome, cpf, categoria_id, curso_id } = data;
        if (!nome || !cpf || !categoria_id || !curso_id) {
            throw new Error("Favor informar todos os campos obrigatórios.");
        }
        if (!this.validarCPF(cpf)) {
            throw new Error("CPF inválido.");
        }
        try {
            await this.usuarioRepository.filterUsuarioByCpf(cpf);
            throw new Error("CPF já cadastrado.");
        }
        catch (error) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }
        await this.categoriaRepository.findById(categoria_id);
        await this.cursoRepository.findById(curso_id);
        const usuario = new UsuarioEntity_1.UsuarioEntity(nome, cpf, StatusUsuario_1.StatusUsuario.ATIVO, categoria_id, curso_id);
        const novoUsuario = await this.usuarioRepository.insertUsuario(usuario);
        console.log("Service - Usuário inserido:", novoUsuario);
        return novoUsuario;
    }
    async listarUsuarios() {
        const usuarios = await this.usuarioRepository.filterAllUsuario();
        console.log("Service - Listar todos os usuários:", usuarios);
        return usuarios;
    }
    async buscarUsuarioPorCPF(cpf) {
        const usuario = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        console.log("Service - Buscar usuário por CPF:", usuario);
        return usuario;
    }
    async atualizarUsuario(cpf, dadosAtualizados) {
        const usuario = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        usuario.nome = dadosAtualizados.nome ?? usuario.nome;
        usuario.status = dadosAtualizados.status ?? usuario.status;
        if (dadosAtualizados.categoria_id) {
            await this.categoriaRepository.findById(dadosAtualizados.categoria_id);
            usuario.categoria_id = dadosAtualizados.categoria_id;
        }
        if (dadosAtualizados.curso_id) {
            await this.cursoRepository.findById(dadosAtualizados.curso_id);
            usuario.curso_id = dadosAtualizados.curso_id;
        }
        await this.usuarioRepository.updateUsuario(usuario);
        console.log("Service - Usuário atualizado:", usuario);
        return usuario;
    }
    async removerUsuario(cpf) {
        const usuarioExistente = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        const emprestimosAtivos = await this.emprestimoRepository.findAtivosByUsuarioId(usuarioExistente.id);
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos ativos.");
        }
        await this.usuarioRepository.deleteUsuario(usuarioExistente.id);
        console.log("Service - Usuário removido com CPF:", cpf);
    }
    async alterarStatus(cpf, novoStatus) {
        const usuario = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        usuario.status = novoStatus;
        await this.usuarioRepository.updateUsuario(usuario);
        console.log(`Service - Status do usuário ${cpf} alterado para ${novoStatus}`);
        return usuario;
    }
    validarCPF(cpf) {
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }
        const digitos = cpf.split('').map(Number);
        const calcularDigito = (parteCpf) => {
            const soma = parteCpf.reduce((acc, digito, index) => {
                const peso = parteCpf.length + 1 - index;
                return acc + (digito * peso);
            }, 0);
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
        const primeirosNove = digitos.slice(0, 9);
        if (calcularDigito(primeirosNove) !== digitos[9]) {
            return false;
        }
        const primeirosDez = digitos.slice(0, 10);
        if (calcularDigito(primeirosDez) !== digitos[10]) {
            return false;
        }
        return true;
    }
}
exports.UsuarioService = UsuarioService;
