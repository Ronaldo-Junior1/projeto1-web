import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepositoryt";

export class CategoriaLivroService {
    private repository = CategoriaLivroRepository.getInstance();

    listarCategoriasLivro(): CategoriaLivroEntity[] {
        return this.repository.findAll();
    }
}