"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueService = void 0;
const EstoqueEntity_1 = require("../model/entity/EstoqueEntity");
const EmprestimoRepository_1 = require("../repository/EmprestimoRepository");
const EstoqueRepository_1 = require("../repository/EstoqueRepository");
const LivroRepository_1 = require("../repository/LivroRepository");
class EstoqueService {
    estoqueRepository = EstoqueRepository_1.EstoqueRepository.getInstance();
    livroRepository = LivroRepository_1.LivroRepository.getInstance();
    emprestimoRepository = EmprestimoRepository_1.EmprestimoRepository.getInstance();
    async novoExemplar(data) {
        const { isbn, codigo_exemplar } = data;
        if (!isbn || !codigo_exemplar) {
            throw new Error("ISBN do livro e código do exemplar são obrigatórios.");
        }
        try {
            await this.estoqueRepository.findById(codigo_exemplar);
            throw new Error("Código de exemplar já cadastrado.");
        }
        catch (error) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }
        const livro = await this.livroRepository.findByIsbn(isbn);
        const novoExemplar = new EstoqueEntity_1.EstoqueEntity(codigo_exemplar, livro.id);
        const exemplarCriado = await this.estoqueRepository.insereEstoque(novoExemplar);
        console.log("Service - Novo exemplar criado:", exemplarCriado);
        return exemplarCriado;
    }
    async listarEstoqueDisponivel() {
        const estoque = await this.estoqueRepository.findAllDisponiveis();
        console.log("Service - Estoque listado:", estoque);
        return estoque;
    }
    async buscarPorCodigo(codigo) {
        const exemplar = await this.estoqueRepository.findById(codigo);
        console.log("Service - Exemplar encontrado:", exemplar);
        return exemplar;
    }
    async atualizarQuantidade(codigo, novaQuantidade) {
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
    async removerExemplar(codigo) {
        const exemplar = await this.buscarPorCodigo(codigo);
        const emprestimoAtivo = await this.emprestimoRepository.findAtivoByEstoqueId(exemplar.id);
        if (emprestimoAtivo) {
            throw new Error("Exemplar não pode ser removido pois está atualmente emprestado.");
        }
        await this.estoqueRepository.removeById(exemplar.id);
        console.log("Service - Exemplar removido, código:", codigo);
    }
    async registrarEmprestimo(codigo_exemplar) {
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
    async registrarDevolucao(codigo_exemplar) {
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
exports.EstoqueService = EstoqueService;
