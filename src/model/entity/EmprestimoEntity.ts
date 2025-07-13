export class EmprestimoEntity {
  id?: number;
  usuario_id: number;
  estoque_id: number;
  data_emprestimo: Date;
  data_devolucao: Date; // A data prevista para a devolução
  data_entrega: Date | null; // A data em que foi efetivamente devolvido
  dias_atraso: number;
  suspensao_ate: Date | null;

  constructor(usuario_id: number, estoque_id: number, data_devolucao: Date,id?:number) {
    this.id = id;
    this.usuario_id = usuario_id;
    this.estoque_id = estoque_id;
    this.data_emprestimo = new Date();
    this.data_devolucao = data_devolucao;
    this.data_entrega = null;
    this.dias_atraso = 0;
    this.suspensao_ate = null;
  }
}