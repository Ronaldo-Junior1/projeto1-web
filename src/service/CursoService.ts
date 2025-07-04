import { CursoRepository } from "../repository/CursoRepository";
import { CursoEntity } from "../model/entity/CursoEntity";

export class CursoService {
    private repository = CursoRepository.getInstance();

    listarCursos(): CursoEntity[] {
        return this.repository.findAll();
    }
}