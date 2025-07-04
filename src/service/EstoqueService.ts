import { EstoqueEntity } from "../model/entity/EstoqueEntity";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    novoExemplar(data: { isbn: string; codigo_exemplar: number }): EstoqueEntity {
        const { isbn, codigo_exemplar } = data;
        if (!isbn || !codigo_exemplar) {
            throw new Error("ISBN do livro e código do exemplar são obrigatórios.");
        }
        if (this.estoqueRepository.findById(codigo_exemplar)) {
            throw new Error("Código de exemplar já cadastrado.");
        }
        const livro = this.livroRepository.findByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro com o ISBN informado não encontrado.");
        }

        const novoExemplar = new EstoqueEntity(codigo_exemplar, livro.id);
        this.estoqueRepository.insereEstoque(novoExemplar);
        return novoExemplar;
    }

    listarEstoque(): EstoqueEntity[] {
        const todosOsExemplares = this.estoqueRepository.findAll();

        const exemplaresDisponiveis = todosOsExemplares.filter(exemplar => exemplar.disponivel === true);

        return exemplaresDisponiveis;
    }
    buscarPorCodigo(codigo: number): EstoqueEntity {
        const exemplar = this.estoqueRepository.findById(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        return exemplar;
    }
    
    atualizarQuantidade(codigo: number, novaQuantidade: number): EstoqueEntity {
        if (novaQuantidade === undefined || novaQuantidade < 0) {
            throw new Error("A nova quantidade é obrigatória e não pode ser negativa.");
        }
        const estoque = this.buscarPorCodigo(codigo);
        if (novaQuantidade < estoque.quantidade_emprestada) {
            throw new Error("A nova quantidade não pode ser menor que a quantidade já emprestada.");
        }
        estoque.quantidade = novaQuantidade;
        estoque.disponivel = estoque.quantidade > estoque.quantidade_emprestada;
        return estoque;
    }

   removerExemplar(codigo: number): void {
        const exemplar = this.buscarPorCodigo(codigo); 

        const emprestimoAtivo = this.emprestimoRepository.findAtivoByEstoqueId(exemplar.id);

        if (emprestimoAtivo) {
            throw new Error("Exemplar não pode ser removido pois está emprestado.");
        }
        
        this.estoqueRepository.removeById(exemplar.id);
    }


    registrarEmprestimo(codigo_exemplar: number): void {
        const estoque = this.buscarPorCodigo(codigo_exemplar);
        
        if (!estoque.disponivel) {
            throw new Error("Não há exemplares disponíveis para empréstimo (verificação final).");
        }

        estoque.quantidade_emprestada++;
        estoque.disponivel = estoque.quantidade > estoque.quantidade_emprestada;
    }

    registrarDevolucao(codigo_exemplar: number): void {
        const estoque = this.buscarPorCodigo(codigo_exemplar);
        if (estoque.quantidade_emprestada > 0) {
            estoque.quantidade_emprestada--;
        }

        estoque.disponivel = true;
    }

}