import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { executarComandoSQL } from "../database/mysql";

export class CategoriaLivroRepository {
  private static instance: CategoriaLivroRepository;
  private categorias: CategoriaLivroEntity[] = [];

  private constructor() {
    this.categorias.push(new CategoriaLivroEntity(1, "Computação"));
    this.categorias.push(new CategoriaLivroEntity(2, "Letras"));
    this.categorias.push(new CategoriaLivroEntity(3, "Gestão"));
    this.categorias.push(new CategoriaLivroEntity(4, "Romance"));
    this.createTable();
  }


  private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro (
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

  async insertCategoriaLivro(nome: string): Promise<CategoriaLivroEntity>{
            const resultado = await executarComandoSQL(
                "INSERT INTO biblioteca.CategoriaLivro (nome) VALUES (?)",
                [nome]
            );
            const newCategoriaLivro = new CategoriaLivroEntity(resultado.insertId,nome)
            console.log('Categoria Livro inserida com sucesso:', newCategoriaLivro);
            return newCategoriaLivro
  }

  static getInstance(): CategoriaLivroRepository {
    if (!this.instance) {
      this.instance = new CategoriaLivroRepository();
    }
    return this.instance;
  }

  findAll(): CategoriaLivroEntity[] {
    return this.categorias;
  }

  findById(id: number): CategoriaLivroEntity | undefined {
    return this.categorias.find(c => c.id === id);
  }
}