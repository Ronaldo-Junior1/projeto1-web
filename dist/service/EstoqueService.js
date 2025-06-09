"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueEntity_1 = require("../model/EstoqueEntity");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    novoExemplar(data) {
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
        const novoExemplar = new EstoqueEntity_1.EstoqueEntity(codigo_exemplar, livro.id);
        this.estoqueRepository.insereEstoque(novoExemplar);
        return novoExemplar;
    }
    listarEstoque() {
        return this.estoqueRepository.findAll();
    }
    buscarPorCodigo(codigo) {
        const exemplar = this.estoqueRepository.findById(codigo);
        if (!exemplar) {
            throw new Error("Exemplar não encontrado.");
        }
        return exemplar;
    }
    atualizarQuantidade(codigo, novaQuantidade) {
        if (novaQuantidade === undefined || novaQuantidade < 0) {
            throw new Error("A nova quantidade é obrigatória e não pode ser negativa.");
        }
        const estoque = this.buscarPorCodigo(codigo);
        if (novaQuantidade < estoque.quantidade_emprestada) {
            throw new Error("A nova quantidade não pode ser menor que a quantidade já emprestada.");
        }
        estoque.quantidade = novaQuantidade;
        // A disponibilidade é reavaliada automaticamente após a mudança de quantidade.
        estoque.disponivel = estoque.quantidade > estoque.quantidade_emprestada;
        return estoque;
    }
    removerExemplar(codigo) {
        const estoque = this.buscarPorCodigo(codigo);
        this.estoqueRepository.removeById(codigo);
    }
    registrarEmprestimo(codigo_exemplar) {
        const estoque = this.buscarPorCodigo(codigo_exemplar);
        // A validação de disponibilidade já foi feita pelo EmprestimoService,
        // mas uma checagem dupla garante a integridade dos dados.
        if (!estoque.disponivel) {
            throw new Error("Não há exemplares disponíveis para empréstimo (verificação final).");
        }
        estoque.quantidade_emprestada++;
        // O status 'disponivel' é atualizado automaticamente com base nas contagens.
        estoque.disponivel = estoque.quantidade > estoque.quantidade_emprestada;
    }
    registrarDevolucao(codigo_exemplar) {
        const estoque = this.buscarPorCodigo(codigo_exemplar);
        if (estoque.quantidade_emprestada > 0) {
            estoque.quantidade_emprestada--;
        }
        // Após uma devolução, o livro sempre volta a ficar disponível.
        estoque.disponivel = true;
    }
}
exports.EstoqueService = EstoqueService;
