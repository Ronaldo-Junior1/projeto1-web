"use strict";
// src/service/EmprestimoService.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoService = void 0;
const EmprestimoEntity_1 = require("../model/EmprestimoEntity");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const UsuarioRepository_1 = require("../repository/UsuarioRepository");
const EstoqueService_1 = require("./EstoqueService");
const LivroRepository_1 = require("../repository/LivroRepository");
const UsuarioService_1 = require("./UsuarioService"); // Importamos o SERVIÇO de usuário
class EmprestimoService {
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    usuarioRepository = UsuarioRepository_1.UsuarioRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    estoqueService = new EstoqueService_1.EstoqueService();
    usuarioService = new UsuarioService_1.UsuarioService(); // Instancia o UsuarioService
    /**
     * Registra um novo empréstimo, validando todas as regras de negócio.
     */
    novoEmprestimo(data) {
        const { cpf, codigo_exemplar } = data;
        const usuario = this.usuarioRepository.findByCPF(cpf);
        if (!usuario)
            throw new Error("Usuário não encontrado.");
        const estoque = this.estoqueService.buscarPorCodigo(codigo_exemplar);
        // Regra: Apenas usuários ativos podem realizar empréstimos. 
        if (usuario.ativo !== "ativo") {
            throw new Error(`Usuário está com status '${usuario.ativo}' e não pode realizar empréstimos.`);
        }
        // Regra: Livro deve estar disponível. 
        if (!estoque.disponivel) {
            throw new Error("Este exemplar não está disponível.");
        }
        const emprestimosAtivos = this.emprestimoRepository.findAtivosByUsuarioId(usuario.id);
        const limite = usuario.categoria_id === 1 ? 5 : 3; // Prof = 5, Aluno = 3 
        // Regra: Não pode ultrapassar limite de empréstimos. 
        if (emprestimosAtivos.length >= limite) {
            throw new Error("Limite de empréstimos atingido para esta categoria de usuário.");
        }
        // ... lógica de cálculo de data de devolução ...
        let diasEmprestimo = usuario.categoria_id === 1 ? 40 : 15; // 
        const livro = this.livroRepository.findById(estoque.livro_id);
        if (usuario.categoria_id === 2 && livro && usuario.curso_id === livro.categoria_id) {
            diasEmprestimo = 30; // 
        }
        const dataDevolucao = new Date();
        dataDevolucao.setDate(dataDevolucao.getDate() + diasEmprestimo);
        const novoEmprestimo = new EmprestimoEntity_1.EmprestimoEntity(usuario.id, estoque.id, dataDevolucao);
        this.emprestimoRepository.registraEmprestimo(novoEmprestimo);
        // Ação Externa: Atualiza o estoque usando o método interno do EstoqueService
        this.estoqueService.registrarEmprestimo(codigo_exemplar);
        return novoEmprestimo;
    }
    listarEmprestimos() {
        return this.emprestimoRepository.findAll();
    }
    registrarDevolucao(emprestimoId) {
        const emprestimo = this.emprestimoRepository.findById(emprestimoId);
        if (!emprestimo)
            throw new Error("Empréstimo não encontrado.");
        if (emprestimo.data_entrega)
            throw new Error("Este livro já foi devolvido.");
        emprestimo.data_entrega = new Date();
        const dataDeEntregaSimulada = new Date(emprestimo.data_devolucao);
        dataDeEntregaSimulada.setDate(dataDeEntregaSimulada.getDate() + 21);
        emprestimo.data_entrega = dataDeEntregaSimulada;
        // A chamada agora usa a nova função de cálculo, mais robusta.
        emprestimo.dias_atraso = this.calcularDiasDeAtraso(emprestimo.data_entrega, emprestimo.data_devolucao);
        if (emprestimo.dias_atraso > 0) {
            const usuario = this.usuarioRepository.findById(emprestimo.usuario_id);
            if (usuario) {
                const diasDeSuspensao = emprestimo.dias_atraso * 3;
                const dataSuspensaoFinal = new Date();
                dataSuspensaoFinal.setDate(dataSuspensaoFinal.getDate() + diasDeSuspensao);
                emprestimo.suspensao_ate = dataSuspensaoFinal;
                const totalEmprestimosComAtraso = this.emprestimoRepository.countEmprestimosComAtrasoPorUsuario(usuario.id);
                if (totalEmprestimosComAtraso > 2 && diasDeSuspensao > 60) {
                    this.usuarioService.inativarUsuario(usuario.cpf);
                }
                else if (diasDeSuspensao > 60) {
                    this.usuarioService.aplicarSuspensao(usuario.cpf);
                }
            }
        }
        this.estoqueService.registrarDevolucao(emprestimo.estoque_id);
        return emprestimo;
    }
    /**
     * Calcula a diferença de dias entre duas datas, ignorando as horas.
     * Esta é a versão corrigida e robusta.
     */
    calcularDiasDeAtraso(dataEntrega, dataDevolucao) {
        // Para evitar problemas com horas, zeramos o tempo de ambas as datas.
        // Isso garante que estamos comparando apenas os dias do calendário.
        const entregaNormalizada = new Date(dataEntrega);
        entregaNormalizada.setHours(0, 0, 0, 0);
        const devolucaoNormalizada = new Date(dataDevolucao);
        devolucaoNormalizada.setHours(0, 0, 0, 0);
        // Se a entrega foi no dia da devolução ou antes, não há atraso.
        if (entregaNormalizada <= devolucaoNormalizada) {
            return 0;
        }
        const umDiaEmMs = 1000 * 60 * 60 * 24;
        const diferencaEmMs = entregaNormalizada.getTime() - devolucaoNormalizada.getTime();
        // Com as datas normalizadas, a divisão será exata.
        return diferencaEmMs / umDiaEmMs;
    }
}
exports.EmprestimoService = EmprestimoService;
