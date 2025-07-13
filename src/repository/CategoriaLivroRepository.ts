import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaLivroRepository {
  private static instance: CategoriaLivroRepository;

  private constructor() {
  }

  async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(255) NOT NULL
        )`;

        try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
            const queryCount = `SELECT COUNT(*) as total FROM biblioteca.CategoriaLivro`;
            const resultadoCount = await executarComandoSQL(queryCount, []);
            const total = resultadoCount[0].total;
            if (total === 0) {
            const categoriasIniciais = ["Computação", "Letras", "Gestão","Romance"];
            for (const nome of categoriasIniciais) {
              await executarComandoSQL(`INSERT INTO biblioteca.CategoriaLivro (nome) VALUES (?)`, [nome]);
            }
            console.log("Categorias iniciais inseridas com sucesso.");
            }
          }catch (err) {
            console.error('Error: ' + err);
          }
    }

  static getInstance(): CategoriaLivroRepository {
    if (!this.instance) {
      this.instance = new CategoriaLivroRepository();
    }
    return this.instance;
  }

  async findAll(): Promise<CategoriaLivroEntity[]> {
     const query = "SELECT * FROM biblioteca.CategoriaLivro" ;

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<CategoriaLivroEntity[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.error(`Falha ao listar as categorias gerando o erro: ${err}`);
            throw err;
        }
  }

 async findById(id: number): Promise<CategoriaLivroEntity> {
        const query = `SELECT * FROM biblioteca.CategoriaLivro WHERE id = ?`;
        try {
            const resultado = await executarComandoSQL(query, [id]);
            
            if (resultado.length === 0) {
                throw new Error("Categoria não encontrada com o ID fornecido");
            }
            
            console.log(`Categoria com ID ${id} localizada com sucesso.`);
            return new Promise<CategoriaLivroEntity>((resolve) => {
                resolve(resultado[0]);
            });
        } catch (error) {
            console.error(`Falha ao buscar categoria pelo ID ${id}:`, error);
            throw error;
        }
    }
}