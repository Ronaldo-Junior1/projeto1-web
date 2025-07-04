import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";

export class CategoriaLivroRepository {
  private static instance: CategoriaLivroRepository;
  private categorias: CategoriaLivroEntity[] = [];

  private constructor() {
    this.categorias.push(new CategoriaLivroEntity(1, "Computação"));
    this.categorias.push(new CategoriaLivroEntity(2, "Letras"));
    this.categorias.push(new CategoriaLivroEntity(3, "Gestão"));
    this.categorias.push(new CategoriaLivroEntity(4, "Romance"));
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