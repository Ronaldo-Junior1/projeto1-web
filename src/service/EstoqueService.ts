import { EstoqueEntity } from "../model/EstoqueEntity";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";

export class EstoqueService {
    private estoqueRepository = EstoqueRepository.getInstance();
    private livroRepository = LivroRepository.getInstance();

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

    listarEstoque() {
        return this.estoqueRepository.findAll();
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
        const estoque = this.buscarPorCodigo(codigo);
        this.estoqueRepository.removeById(codigo);
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