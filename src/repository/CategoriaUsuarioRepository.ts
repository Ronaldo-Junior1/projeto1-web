export class CategoriaUsuarioRepository {
  private static instance: CategoriaUsuarioRepository;
  private categorias = [
    { id: 1, nome: "Professor" },
    { id: 2, nome: "Aluno" },
    { id: 3, nome: "Bibliotecario" }
  ];

  private constructor() {}

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
