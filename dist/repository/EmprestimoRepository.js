"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimoList = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    registraEmprestimo(emprestimo) {
        this.emprestimoList.push(emprestimo);
    }
    findAll() {
        return this.emprestimoList;
    }
    findById(id) {
        return this.emprestimoList.find(e => e.id === id);
    }
    findAtivosByUsuarioId(usuario_id) {
        return this.emprestimoList.filter(e => e.usuario_id === usuario_id && e.data_entrega === null);
    }
    countEmprestimosComAtrasoPorUsuario(usuario_id) {
        return this.emprestimoList.filter(e => e.usuario_id === usuario_id && e.dias_atraso > 0).length;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
