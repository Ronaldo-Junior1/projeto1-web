"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoEntity = void 0;
class EmprestimoEntity {
    id;
    usuario_id;
    estoque_id;
    data_emprestimo;
    data_devolucao; // A data prevista para a devolução
    data_entrega; // A data em que foi efetivamente devolvido
    dias_atraso;
    suspensao_ate;
    constructor(usuario_id, estoque_id, data_devolucao) {
        this.id = this.gerarId();
        this.usuario_id = usuario_id;
        this.estoque_id = estoque_id;
        this.data_emprestimo = new Date();
        this.data_devolucao = data_devolucao;
        this.data_entrega = null;
        this.dias_atraso = 0;
        this.suspensao_ate = null;
    }
    gerarId() {
        return parseInt((Date.now() * Math.random()).toString());
    }
}
exports.EmprestimoEntity = EmprestimoEntity;
