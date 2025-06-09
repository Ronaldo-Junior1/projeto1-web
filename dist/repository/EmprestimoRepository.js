"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
class EmprestimoRepository {
    static instance;
    emprestimos = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    registraEmprestimo(emprestimo) {
        this.emprestimos.push(emprestimo);
    }
    findAll() {
        return this.emprestimos;
    }
    findById(id) {
        return this.emprestimos.find(e => e.id === id);
    }
    findAtivosByUsuarioId(usuario_id) {
        return this.emprestimos.filter(e => e.usuario_id === usuario_id && e.data_entrega === null);
    }
    findAtivoByEstoqueId(estoque_id) {
        return this.emprestimos.find(e => e.estoque_id === estoque_id && e.data_entrega === null);
    }
    countEmprestimosComAtrasoPorUsuario(usuario_id) {
        return this.emprestimos.filter(e => e.usuario_id === usuario_id && e.dias_atraso > 0).length;
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
