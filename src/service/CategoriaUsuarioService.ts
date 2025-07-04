import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";

export class CategoriaUsuarioService {
    private repository = CategoriaUsuarioRepository.getInstance();

    listarCategoriasUsuario(): CategoriaUsuarioEntity[] {
        return this.repository.findAll();
    }
}