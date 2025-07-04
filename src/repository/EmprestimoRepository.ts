import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;
  private emprestimos: EmprestimoEntity[] = [];

  private constructor() {}

  static getInstance(): EmprestimoRepository {
    if (!this.instance) {
      this.instance = new EmprestimoRepository();
    }
    return this.instance;
  }

  registraEmprestimo(emprestimo: EmprestimoEntity): void {
    this.emprestimos.push(emprestimo);
  }

  findAll(): EmprestimoEntity[] {
    return this.emprestimos;
  }

  findById(id: number): EmprestimoEntity | undefined {
    return this.emprestimos.find(e => e.id === id);
  }
  
  findAtivosByUsuarioId(usuario_id: number): EmprestimoEntity[] {
    return this.emprestimos.filter(e => e.usuario_id === usuario_id && e.data_entrega === null);
  }

  findAtivoByEstoqueId(estoque_id: number): EmprestimoEntity | undefined {
    return this.emprestimos.find(e => e.estoque_id === estoque_id && e.data_entrega === null);
  }

  countEmprestimosComAtrasoPorUsuario(usuario_id: number): number {
    return this.emprestimos.filter(e => 
            e.usuario_id === usuario_id && e.dias_atraso > 0
    ).length;
  }

}