"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
class UsuarioEntity {
    id;
    nome;
    cpf;
    ativo;
    categoria_id;
    curso_id;
    constructor(nome, cpf, ativo, categoria_id, curso_id) {
        this.id = this.gerarId();
        this.nome = nome;
        this.cpf = cpf;
        this.ativo = ativo;
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
    }
    gerarId() {
        return parseInt((Date.now() / 100).toString(), 10);
    }
}
exports.UsuarioEntity = UsuarioEntity;
