"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
class UsuarioRepository {
    static instance;
    usuarios = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
    insereUsuario(usuario) {
        this.usuarios.push(usuario);
    }
    removeUsuarioPorCPF(cpf) {
        const index = this.usuarios.findIndex(u => u.cpf === cpf);
        if (index === -1) {
            throw new Error("Usuário com o CPF informado não foi encontrado para remoção!");
        }
        this.usuarios.splice(index, 1);
    }
    findAll() {
        return this.usuarios;
    }
    findByCPF(cpf) {
        return this.usuarios.find(u => u.cpf === cpf);
    }
}
exports.UsuarioRepository = UsuarioRepository;
