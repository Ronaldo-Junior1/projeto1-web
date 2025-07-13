import { executarComandoSQL } from "../database/mysql";
import { EmprestimoEntity } from "../model/entity/EmprestimoEntity";

export class EmprestimoRepository {
  private static instance: EmprestimoRepository;

  private constructor() {
    this.createTable();
  }

  public static getInstance(): EmprestimoRepository {
    if (!this.instance) {
      this.instance = new EmprestimoRepository();
    }
    return this.instance;
  }

  private async createTable() {
    const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            estoque_id INT NOT NULL,
            data_emprestimo DATE NOT NULL,
            data_devolucao DATE NOT NULL,
            data_entrega DATE NULL,
            dias_atraso INT NOT NULL DEFAULT 0,
            suspensao_ate DATE NULL
        )`;
    try {
      await executarComandoSQL(query, []);
      console.log('Tabela Emprestimo verificada/criada com sucesso.');
    } catch (err) {
      console.error('Erro ao criar a tabela Emprestimo:', err);
    }
  }

  async insertEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
    const query = `INSERT INTO biblioteca.Emprestimo 
                       (usuario_id, estoque_id, data_emprestimo, data_devolucao, dias_atraso, data_entrega, suspensao_ate) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      emprestimo.usuario_id,
      emprestimo.estoque_id,
      emprestimo.data_emprestimo,
      emprestimo.data_devolucao,
      emprestimo.dias_atraso,
      emprestimo.data_entrega,
      emprestimo.suspensao_ate
    ];

    try {
      const resultado = await executarComandoSQL(query, params);
      emprestimo.id = resultado.insertId;

      console.log('Empréstimo registrado com sucesso, ID:', emprestimo.id);
      return new Promise(resolve => resolve(emprestimo));
    } catch (err) {
      console.error('Erro ao registrar o empréstimo:', err);
      throw err;
    }
  }

  async updateEmprestimo(emprestimo: EmprestimoEntity): Promise<EmprestimoEntity> {
    const query = `UPDATE biblioteca.Emprestimo SET 
                       data_entrega = ?, dias_atraso = ?, suspensao_ate = ?
                       WHERE id = ?`;
    const params = [emprestimo.data_entrega, emprestimo.dias_atraso, emprestimo.suspensao_ate, emprestimo.id];
    try {
      await executarComandoSQL(query, params);
      console.log(`Empréstimo ID ${emprestimo.id} atualizado com sucesso.`);
      return new Promise(resolve => resolve(emprestimo));
    } catch (err) {
      console.error(`Falha ao atualizar o empréstimo ID ${emprestimo.id}:`, err);
      throw err;
    }
  }

  async findAll(): Promise<EmprestimoEntity[]> {
    const query = "SELECT * FROM biblioteca.Emprestimo";
    try {
      const resultado = await executarComandoSQL(query, []);
      console.log('Empréstimos listados com sucesso.');
      return new Promise(resolve => resolve(resultado));
    } catch (err) {
      console.error('Falha ao listar os empréstimos:', err);
      throw err;
    }
  }

  async findById(id: number): Promise<EmprestimoEntity> {
    const query = "SELECT * FROM biblioteca.Emprestimo WHERE id = ?";
    try {
      const resultado = await executarComandoSQL(query, [id]);
      if (resultado.length === 0) {
        throw new Error(`Empréstimo com ID ${id} não encontrado.`);
      }
      console.log('Empréstimo localizado com sucesso, ID:', id);
      return new Promise(resolve => resolve(resultado[0]));
    } catch (err) {
      console.error(`Falha ao procurar o empréstimo de ID ${id}:`, err);
      throw err;
    }
  }

  async findAtivosByUsuarioId(usuario_id: number): Promise<EmprestimoEntity[]> {
    const query = "SELECT * FROM biblioteca.Emprestimo WHERE usuario_id = ? AND data_entrega IS NULL";
    try {
      const resultado = await executarComandoSQL(query, [usuario_id]);
      console.log(`Empréstimos ativos para o usuário ID ${usuario_id} listados com sucesso.`);
      return new Promise(resolve => resolve(resultado));
    } catch (err) {
      console.error(`Falha ao listar empréstimos ativos para o usuário ID ${usuario_id}:`, err);
      throw err;
    }
  }

  async findAtivoByEstoqueId(estoque_id: number): Promise<EmprestimoEntity> {
    const query = "SELECT * FROM biblioteca.Emprestimo WHERE estoque_id = ? AND data_entrega IS NULL";
    try {
      const resultado = await executarComandoSQL(query, [estoque_id]);
      if (resultado.length === 0) {
        throw new Error(`Nenhum empréstimo ativo encontrado para o exemplar de ID ${estoque_id}.`);
      }
      console.log(`Empréstimo ativo para o exemplar ID ${estoque_id} localizado com sucesso.`);
      return new Promise(resolve => resolve(resultado[0]));
    } catch (err) {
      console.error(`Falha ao procurar empréstimo ativo para o exemplar ID ${estoque_id}:`, err);
      throw err;
    }
  }


  async countEmprestimosComAtrasoPorUsuario(usuario_id: number): Promise<number> {
    const query = "SELECT COUNT(*) as total FROM biblioteca.Emprestimo WHERE usuario_id = ? AND dias_atraso > 0";
    try {
      const resultado = await executarComandoSQL(query, [usuario_id]);
      const total = resultado[0].total;
      console.log(`Usuário ID ${usuario_id} possui ${total} empréstimos com atraso.`);
      return new Promise(resolve => resolve(total));
    } catch (err) {
      console.error(`Falha ao contar empréstimos com atraso para o usuário ID ${usuario_id}:`, err);
      throw err;
    }
  }
}