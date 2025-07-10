import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepositoryt";

export class CategoriaLivroService {
    private repository = CategoriaLivroRepository.getInstance();

    listarCategoriasLivro(): CategoriaLivroEntity[] {
        return this.repository.findAll();
    }

    async insertCategoriaLivro(data : any):Promise<CategoriaLivroEntity>{
        if(!data.nome){
            throw new Error('Favor informar o nome')
        }
        return this.repository.insertCategoriaLivro(data.nome)
    }
}