import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepositoryt";

export class CategoriaLivroService {
    private repository = CategoriaLivroRepository.getInstance();

    async listarCategoriasLivro(): Promise<CategoriaLivroEntity[]> {
       const categorias =  await this.repository.findAll();
        console.log("Service - Filtrar Todos", categorias);
        return categorias;
    }

    async insertCategoriaLivro(data : any):Promise<CategoriaLivroEntity>{
        if(!data.nome){
            throw new Error('Favor informar o nome')
        }
        return this.repository.insertCategoriaLivro(data.nome)
    }
}