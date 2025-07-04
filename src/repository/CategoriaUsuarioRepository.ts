import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";

export class CategoriaUsuarioRepository {
  private static instance: CategoriaUsuarioRepository;
  private categorias: CategoriaUsuarioEntity[] = [];

  private constructor() {
    this.categorias.push(new CategoriaUsuarioEntity(1, "Professor"));
    this.categorias.push(new CategoriaUsuarioEntity(2, "Aluno"));
    this.categorias.push(new CategoriaUsuarioEntity(3, "Bibliotecário"));
  }

  static getInstance(): CategoriaUsuarioRepository {
    if (!this.instance) {
      this.instance = new CategoriaUsuarioRepository();
    }
    return this.instance;
  }

  findAll(): CategoriaUsuarioEntity[] {
    return this.categorias;
  }

  findById(id: number) {
    return this.categorias.find(c => c.id === id);
  }

}
