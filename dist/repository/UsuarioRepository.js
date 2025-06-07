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
    removeUsuarioPorCPF(id) {
        const index = this.findIndex(id);
        this.usuarioList.splice(index, 1);
    }
    findAll() {
        return this.usuarioList;
    }
    findByCPF(cpf) {
        return this.usuarioList.find(u => u.cpf === cpf);
    }
    findIndex(id) {
        const index = this.usuarioList.findIndex(u => u.id === id);
        if (index === -1) {
            throw new Error("ID informado não foi encontrado!");
        }
        return index;
    }
}
exports.UsuarioRepository = UsuarioRepository;
