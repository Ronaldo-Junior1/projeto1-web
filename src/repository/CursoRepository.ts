import { executarComandoSQL } from "../database/mysql";
import { CursoEntity } from "../model/entity/CursoEntity";

export class CursoRepository {
  private static instance: CursoRepository;
   private cursos: CursoEntity[] = [];


  private constructor() {
    this.cursos.push(new CursoEntity(1, "ADS"));
    this.cursos.push(new CursoEntity(2, "Pedagogia"));
    this.cursos.push(new CursoEntity(3, "Administracao"));
    this.createTable();
  }

   private async createTable() {
          const query = `
          CREATE TABLE IF NOT EXISTS biblioteca.Curso (
              id INT AUTO_INCREMENT PRIMARY KEY,
              nome VARCHAR(255) NOT NULL
          )`;
  
          try {
                const resultado =  await executarComandoSQL(query, []);
                console.log('Query executada com sucesso:', resultado);
                const queryCount = `SELECT COUNT(*) as total FROM Curso`;
                const resultadoCount = await executarComandoSQL(queryCount, []);
                const total = resultadoCount[0].total;
                if (total === 0) {
                const cursosIniciais = ["ADS", "Pedagogia", "Administracao"];
                for (const nome of cursosIniciais) {
                    await executarComandoSQL(`INSERT INTO biblioteca.Curso (nome) VALUES (?)`, [nome]);
                }
                console.log("Cursos inicias inseridos com sucesso.");
              }
          } catch (err) {
              console.error('Error: ' + err);
          }
      }

  static getInstance(): CursoRepository {
    if (!this.instance) {
      this.instance = new CursoRepository();
    }
    return this.instance;
  }

  async findAll(): Promise<CursoEntity[]> {
    const query = "SELECT * FROM biblioteca.Curso" ;
    try {
          const resultado = await executarComandoSQL(query, []);
          return new Promise<CursoEntity[]>((resolve)=>{
          resolve(resultado);
          })
        }catch (err:any) {
          console.error(`Falha ao listar cursos gerando o erro: ${err}`);
          throw err;
        }
  }

  findById(id: number) {
    return this.cursos.find(c => c.id === id);
  }
}