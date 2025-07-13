"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const EmprestimoEntity_1 = require("../model/entity/EmprestimoEntity");
const StatusUsuario_1 = require("../model/enum/StatusUsuario");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const EstoqueService_1 = require("./EstoqueService");
const UsuarioService_1 = require("./UsuarioService");
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    estoqueService = new EstoqueService_1.EstoqueService();
    usuarioService = new UsuarioService_1.UsuarioService();
    async novoEmprestimo(data) {
        const { cpf, codigo_exemplar } = data;
        const usuario = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        const estoque = await this.estoqueService.buscarPorCodigo(codigo_exemplar);
        if (usuario.status !== StatusUsuario_1.StatusUsuario.ATIVO) {
            throw new Error(`Usuário está com status '${usuario.status}' e não pode realizar empréstimos.`);
        }
        if (!estoque.disponivel) {
            throw new Error("Este exemplar não está disponível para empréstimo.");
        }
        const emprestimosAtivos = await this.emprestimoRepository.findAtivosByUsuarioId(usuario.id);
        const limite = usuario.categoria_id === 1 ? 5 : 3; // Professor: 5, Aluno: 3
        if (emprestimosAtivos.length >= limite) {
            throw new Error("Limite de empréstimos atingido para esta categoria de usuário.");
        }
        let diasEmprestimo = usuario.categoria_id === 1 ? 40 : 15; // Professor: 40, Aluno: 15
        const livro = await this.livroRepository.findById(estoque.livro_id);
        if (usuario.categoria_id === 2 && usuario.curso_id === livro.categoria_id) {
            diasEmprestimo = 30;
        }
        const dataDevolucao = new Date();
        dataDevolucao.setDate(dataDevolucao.getDate() + diasEmprestimo);
        const novoEmprestimo = new EmprestimoEntity_1.EmprestimoEntity(usuario.id, estoque.id, dataDevolucao);
        const emprestimoRegistrado = await this.emprestimoRepository.insertEmprestimo(novoEmprestimo);
        await this.estoqueService.registrarEmprestimo(codigo_exemplar);
        console.log("Service - Novo empréstimo registrado:", emprestimoRegistrado);
        return emprestimoRegistrado;
    }
    async listarEmprestimos() {
        const emprestimos = await this.emprestimoRepository.findAll();
        console.log("Service - Listando todos os empréstimos:", emprestimos);
        return emprestimos;
    }
    async registrarDevolucao(emprestimoId) {
        const emprestimo = await this.emprestimoRepository.findById(emprestimoId);
        if (emprestimo.data_entrega) {
            throw new Error("Este livro já foi devolvido.");
        }
        emprestimo.data_entrega = new Date();
        emprestimo.dias_atraso = this.calcularDiasDeAtraso(emprestimo.data_entrega, new Date(emprestimo.data_devolucao));
        if (emprestimo.dias_atraso > 0) {
            const diasDeSuspensao = emprestimo.dias_atraso * 3;
            const dataSuspensaoFinal = new Date();
            dataSuspensaoFinal.setDate(dataSuspensaoFinal.getDate() + diasDeSuspensao);
            emprestimo.suspensao_ate = dataSuspensaoFinal;
            const usuario = await this.usuarioRepository.filterUsuarioById(emprestimo.usuario_id);
            const totalAtrasos = await this.emprestimoRepository.countEmprestimosComAtrasoPorUsuario(usuario.id);
            if (totalAtrasos > 2) {
                await this.usuarioService.alterarStatus(usuario.cpf, StatusUsuario_1.StatusUsuario.INATIVO);
            }
            else if (diasDeSuspensao > 60) {
                await this.usuarioService.alterarStatus(usuario.cpf, StatusUsuario_1.StatusUsuario.SUSPENSO);
            }
        }
        const emprestimoAtualizado = await this.emprestimoRepository.updateEmprestimo(emprestimo);
        await this.estoqueService.registrarDevolucao(emprestimo.estoque_id);
        console.log("Service - Devolução registrada:", emprestimoAtualizado);
        return emprestimoAtualizado;
    }
    calcularDiasDeAtraso(dataEntrega, dataDevolucao) {
        const entrega = new Date(dataEntrega.getFullYear(), dataEntrega.getMonth(), dataEntrega.getDate());
        const devolucao = new Date(dataDevolucao.getFullYear(), dataDevolucao.getMonth(), dataDevolucao.getDate());
        if (entrega <= devolucao) {
            return 0;
        }
        const umDiaEmMs = 1000 * 60 * 60 * 24;
        const diferencaEmMs = entrega.getTime() - devolucao.getTime();
        return Math.ceil(diferencaEmMs / umDiaEmMs);
    }
}
exports.EmprestimoService = EmprestimoService;
