"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueEntity = void 0;
class EstoqueEntity {
    id;
    livro_id;
    quantidade;
    quantidade_emprestada;
    disponivel;
    constructor(codigo_exemplar, livro_id) {
        this.id = codigo_exemplar;
        this.livro_id = livro_id;
        this.quantidade = 0;
        this.quantidade_emprestada = 0;
        this.disponivel = false;
    }
}
exports.EstoqueEntity = EstoqueEntity;
