import { executarComandoSQL } from "../database/mysql";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";

export class CategoriaUsuarioRepository {
  private static instance: CategoriaUsuarioRepository;
  private categorias: CategoriaUsuarioEntity[] = [];

  private constructor() {
    this.createTable();
  }

  private async createTable() {
          const query = `
          CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario (
              id INT AUTO_INCREMENT PRIMARY KEY,
              nome VARCHAR(255) NOT NULL
          )`;
  
         try {
            const resultado =  await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
            const queryCount = `SELECT COUNT(*) as total FROM biblioteca.CategoriaUsuario`;
            const resultadoCount = await executarComandoSQL(queryCount, []);
            const total = resultadoCount[0].total;
            if (total === 0) {
            const categoriasIniciais = ["Professor", "Aluno", "Bibliotecário"];
            for (const nome of categoriasIniciais) {
              await executarComandoSQL(`INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)`, [nome]);
            }
            console.log("Categorias iniciais inseridas com sucesso.");
            }
          }catch (err) {
            console.error('Error: ' + err);
          }
      }
  
    async findAll(): Promise<CategoriaUsuarioEntity[]> {
      const query = "SELECT * FROM biblioteca.CategoriaUsuario" ;
 
         try {
             const resultado = await executarComandoSQL(query, []);
             return new Promise<CategoriaUsuarioEntity[]>((resolve)=>{
                 resolve(resultado);
             })
         } catch (err:any) {
             console.error(`Falha ao listar as categorias gerando o erro: ${err}`);
             throw err;
         }
   }

  static getInstance(): CategoriaUsuarioRepository {
    if (!this.instance) {
      this.instance = new CategoriaUsuarioRepository();
    }
    return this.instance;
  }

  

  findById(id: number) {
    return this.categorias.find(c => c.id === id);
  }

}
