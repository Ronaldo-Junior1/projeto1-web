import { CursoRepository } from "../repository/CursoRepository";
import { CursoEntity } from "../model/entity/CursoEntity";

export class CursoService {
    private repository = CursoRepository.getInstance();

    async listarCursos(): Promise<CursoEntity[]> {
        const cursos =  await this.repository.findAll();
        console.log("Service - Filtrar Todos", cursos);
        return cursos;
    }
}