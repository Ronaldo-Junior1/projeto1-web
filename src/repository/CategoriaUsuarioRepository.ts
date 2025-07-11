import { executarComandoSQL } from "../database/mysql";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";

export class CategoriaUsuarioRepository {
  private static instance: CategoriaUsuarioRepository;
  private categorias: CategoriaUsuarioEntity[] = [];

  private constructor() {
    this.categorias.push(new CategoriaUsuarioEntity(1, "Professor"));
    this.categorias.push(new CategoriaUsuarioEntity(2, "Aluno"));
    this.categorias.push(new CategoriaUsuarioEntity(3, "Bibliotecário"));
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
          } catch (err) {
              console.error('Error: ' + err);
          }
      }
  
    async insertCategoriaUsuario(nome: string): Promise<CategoriaUsuarioEntity>{
              const resultado = await executarComandoSQL(
                  "INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)",
                  [nome]
              );
              const newCategoriaUsuario = new CategoriaUsuarioEntity(resultado.insertId,nome)
              console.log('Categoria Usuario inserida com sucesso:', newCategoriaUsuario);
              return newCategoriaUsuario
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
