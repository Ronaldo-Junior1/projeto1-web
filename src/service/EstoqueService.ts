import { EstoqueEntity } from "../model/entity/EstoqueEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    async novoExemplar(data: { isbn: string; codigo_exemplar: number }): Promise<EstoqueEntity> {
        const { isbn, codigo_exemplar } = data;
        if (!isbn || !codigo_exemplar) {
            throw new Error("ISBN do livro e código do exemplar são obrigatórios.");
        }
        try {
            await this.estoqueRepository.findById(codigo_exemplar);
            throw new Error("Código de exemplar já cadastrado.");
        } catch (error: any) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }
        
        const livro = await this.livroRepository.findByIsbn(isbn);
        
        const novoExemplar = new EstoqueEntity(codigo_exemplar, livro.id!);
        
        const exemplarCriado = await this.estoqueRepository.insereEstoque(novoExemplar);
        console.log("Service - Novo exemplar criado:", exemplarCriado);
        return exemplarCriado;
    }

    async listarEstoqueDisponivel(): Promise<EstoqueEntity[]> {
        const estoque = await this.estoqueRepository.findAllDisponiveis();
        console.log("Service - Estoque listado:", estoque);
        return estoque;
    }

    async buscarPorCodigo(codigo: number): Promise<EstoqueEntity> {
        const exemplar = await this.estoqueRepository.findById(codigo);
        console.log("Service - Exemplar encontrado:", exemplar);
        return exemplar;
    }
    
    async atualizarQuantidade(codigo: number, novaQuantidade: number): Promise<EstoqueEntity> {
        if (novaQuantidade === undefined || novaQuantidade < 0) {
            throw new Error("A nova quantidade é obrigatória e não pode ser negativa.");
        }

        const estoque = await this.buscarPorCodigo(codigo);
        
        if (novaQuantidade < estoque.quantidade_emprestada) {
            throw new Error("A nova quantidade não pode ser menor que a quantidade já emprestada.");
        }

        estoque.quantidade = novaQuantidade;
        estoque.disponivel = estoque.quantidade > estoque.quantidade_emprestada;
        
        const estoqueAtualizado = await this.estoqueRepository.updateEstoque(estoque);
        console.log("Service - Quantidade atualizada:", estoqueAtualizado);
        return estoqueAtualizado;
    }

    async removerExemplar(codigo: number): Promise<void> {
        const exemplar = await this.buscarPorCodigo(codigo); 

        const emprestimoAtivo = await this.emprestimoRepository.findAtivoByEstoqueId(exemplar.id);

        if (emprestimoAtivo) {
            throw new Error("Exemplar não pode ser removido pois está atualmente emprestado.");
        }
        
        await this.estoqueRepository.removeById(exemplar.id);
        console.log("Service - Exemplar removido, código:", codigo);
    }

    async registrarEmprestimo(codigo_exemplar: number): Promise<EstoqueEntity> {
        const estoque = await this.buscarPorCodigo(codigo_exemplar);
        
        if (!estoque.disponivel) {
            throw new Error("Não há exemplares disponíveis deste item para empréstimo.");
        }

        estoque.quantidade_emprestada++;
        estoque.disponivel = estoque.quantidade > estoque.quantidade_emprestada;

        const estoqueAtualizado = await this.estoqueRepository.updateEstoque(estoque);
        console.log("Service - Empréstimo registrado:", estoqueAtualizado);
        return estoqueAtualizado;
    }

    async registrarDevolucao(codigo_exemplar: number): Promise<EstoqueEntity> {
        const estoque = await this.buscarPorCodigo(codigo_exemplar);
        
        if (estoque.quantidade_emprestada > 0) {
            estoque.quantidade_emprestada--;
        }

        estoque.disponivel = true;

        const estoqueAtualizado = await this.estoqueRepository.updateEstoque(estoque);
        console.log("Service - Devolução registrada:", estoqueAtualizado);
        return estoqueAtualizado;
    }
}