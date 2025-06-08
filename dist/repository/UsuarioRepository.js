"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    usuarioList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    insereUsuario(usuario) {
        this.usuarioList.push(usuario);
    }
    removeUsuarioPorCPF(cpf) {
        const index = this.usuarioList.findIndex(u => u.cpf === cpf);
        if (index === -1) {
            throw new Error("Usuário com o CPF informado não foi encontrado para remoção!");
        }
        this.usuarioList.splice(index, 1);
    }
    findAll() {
        return this.usuarioList;
    }
    findByCPF(cpf) {
        return this.usuarioList.find(u => u.cpf === cpf);
    }
}
exports.UsuarioRepository = UsuarioRepository;
