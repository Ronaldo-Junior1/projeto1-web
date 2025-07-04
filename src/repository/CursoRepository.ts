import { CursoEntity } from "../model/entity/CursoEntity";

export class CursoRepository {
  private static instance: CursoRepository;
   private cursos: CursoEntity[] = [];


  private constructor() {
    this.cursos.push(new CursoEntity(1, "ADS"));
    this.cursos.push(new CursoEntity(2, "Pedagogia"));
    this.cursos.push(new CursoEntity(3, "Administracao"));
  }

  static getInstance(): CursoRepository {
    if (!this.instance) {
      this.instance = new CursoRepository();
    }
    return this.instance;
  }

  findAll(): CursoEntity[] {
    return this.cursos;
  }

  findById(id: number) {
    return this.cursos.find(c => c.id === id);
  }
}