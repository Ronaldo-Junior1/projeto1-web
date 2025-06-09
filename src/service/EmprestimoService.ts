import { EmprestimoEntity } from "../model/EmprestimoEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { EstoqueService } from "./EstoqueService";
import { LivroRepository } from "../repository/LivroRepository";
import { UsuarioService } from "./UsuarioService";

export class EmprestimoService {
    private emprestimoRepository = EmprestimoRepository.getInstance();
    private usuarioRepository = UsuarioRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private estoqueService = new EstoqueService();
    private usuarioService = new UsuarioService();

    novoEmprestimo(data: { cpf: string, codigo_exemplar: number }): EmprestimoEntity {
        const { cpf, codigo_exemplar } = data;
        
        const usuario = this.usuarioRepository.findByCPF(cpf);
        if (!usuario) throw new Error("Usuário não encontrado.");

        const estoque = this.estoqueService.buscarPorCodigo(codigo_exemplar);
        
        if (usuario.ativo !== "ativo") {
            throw new Error(`Usuário está com status '${usuario.ativo}' e não pode realizar empréstimos.`);
        }

        if (!estoque.disponivel) {
            throw new Error("Este exemplar não está disponível.");
        }

        const emprestimosAtivos = this.emprestimoRepository.findAtivosByUsuarioId(usuario.id);
        const limite = usuario.categoria_id === 1 ? 5 : 3; // Prof = 5, Aluno = 3 
        
        if (emprestimosAtivos.length >= limite) {
            throw new Error("Limite de empréstimos atingido para esta categoria de usuário.");
        }

        let diasEmprestimo = usuario.categoria_id === 1 ? 40 : 15;
        const livro = this.livroRepository.findById(estoque.livro_id);
        if (usuario.categoria_id === 2 && livro && usuario.curso_id === livro.categoria_id) {
            diasEmprestimo = 30;
        }
        const dataDevolucao = new Date();
        dataDevolucao.setDate(dataDevolucao.getDate() + diasEmprestimo);
        

        const novoEmprestimo = new EmprestimoEntity(usuario.id, estoque.id, dataDevolucao);
        this.emprestimoRepository.registraEmprestimo    (novoEmprestimo);

        this.estoqueService.registrarEmprestimo(codigo_exemplar);
        
        return novoEmprestimo;
    }

    listarEmprestimos() {
        return this.emprestimoRepository.findAll();
    }

    registrarDevolucao(emprestimoId: number): EmprestimoEntity {
        const emprestimo = this.emprestimoRepository.findById(emprestimoId);
        if (!emprestimo) throw new Error("Empréstimo não encontrado.");
        if (emprestimo.data_entrega) throw new Error("Este livro já foi devolvido.");

        emprestimo.data_entrega = new Date();
        const dataDeEntregaSimulada = new Date(emprestimo.data_devolucao);
        dataDeEntregaSimulada.setDate(dataDeEntregaSimulada.getDate() + 21);
        emprestimo.data_entrega = dataDeEntregaSimulada;

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
                } else if (diasDeSuspensao > 60) {
                    this.usuarioService.aplicarSuspensao(usuario.cpf);
                }
            }
        }

        this.estoqueService.registrarDevolucao(emprestimo.estoque_id);
        return emprestimo;
    }

    private calcularDiasDeAtraso(dataEntrega: Date, dataDevolucao: Date): number {
        const entregaNormalizada = new Date(dataEntrega);
        entregaNormalizada.setHours(0, 0, 0, 0);

        const devolucaoNormalizada = new Date(dataDevolucao);
        devolucaoNormalizada.setHours(0, 0, 0, 0);

        if (entregaNormalizada <= devolucaoNormalizada) {
            return 0;
        }

        const umDiaEmMs = 1000 * 60 * 60 * 24;
        const diferencaEmMs = entregaNormalizada.getTime() - devolucaoNormalizada.getTime();

        return diferencaEmMs / umDiaEmMs;
    }

}