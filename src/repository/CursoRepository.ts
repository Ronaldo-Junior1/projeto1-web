export class CursoRepository {
  private static instance: CursoRepository;
  private cursos = [
    { id: 1, nome: "ADS" },
    { id: 2, nome: "Pedagogia" },
    { id: 3, nome: "Administracao" }
  ];

  private constructor() {}

  static getInstance(): CursoRepository {
    if (!this.instance) {
      this.instance = new CursoRepository();
    }
    return this.instance;
  }

  findById(id: number) {
    return this.cursos.find(c => c.id === id);
  }
}