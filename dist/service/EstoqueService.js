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
    atualizarEstoque(codigo, dados) {
        const estoque = this.buscarPorCodigo(codigo);
        if (dados.quantidade !== undefined) {
            if (dados.quantidade < 0)
                throw new Error("Quantidade não pode ser negativa.");
            estoque.quantidade = dados.quantidade;
        }
        if (dados.disponivel !== undefined) {
            estoque.disponivel = dados.disponivel;
        }
        return estoque;
    }
    removerExemplar(codigo) {
        const estoque = this.buscarPorCodigo(codigo);
        this.estoqueRepository.removeById(codigo);
    }
}
exports.EstoqueService = EstoqueService;
