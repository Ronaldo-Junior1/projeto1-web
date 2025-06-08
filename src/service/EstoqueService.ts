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
    
    atualizarEstoque(codigo: number, dados: { quantidade?: number, disponivel?: boolean }): EstoqueEntity {
        const estoque = this.buscarPorCodigo(codigo);

        if (dados.quantidade !== undefined) {
            if (dados.quantidade < 0) throw new Error("Quantidade não pode ser negativa.");
            estoque.quantidade = dados.quantidade;
        }

        if (dados.disponivel !== undefined) {
            estoque.disponivel = dados.disponivel;
        }
        
        return estoque;
    }

    removerExemplar(codigo: number): void {
        const estoque = this.buscarPorCodigo(codigo);
        this.estoqueRepository.removeById(codigo);
    }
}