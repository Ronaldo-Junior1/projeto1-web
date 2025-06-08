import { CategoriaLivroEntity } from "../model/CategoriaLivroEntity";

export class CategoriaLivroRepository {
  private static instance: CategoriaLivroRepository;
  private categorias: CategoriaLivroEntity[] = [];

  private constructor() {
    this.categorias.push(new CategoriaLivroEntity(1, "Romance"));
    this.categorias.push(new CategoriaLivroEntity(2, "Computação"));
    this.categorias.push(new CategoriaLivroEntity(3, "Letras"));
    this.categorias.push(new CategoriaLivroEntity(4, "Gestão"));
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