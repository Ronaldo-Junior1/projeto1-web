import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepositoryt";

export class CategoriaLivroService {
    private repository = CategoriaLivroRepository.getInstance();

    async listarCategoriasLivro(): Promise<CategoriaLivroEntity[]> {
       const categorias =  await this.repository.findAll();
        console.log("Service - Filtrar Todos", categorias);
        return categorias;
    }
}