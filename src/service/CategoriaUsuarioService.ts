import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";

export class CategoriaUsuarioService {
    private repository = CategoriaUsuarioRepository.getInstance();

    async listarCategoriasUsuario(): Promise<CategoriaUsuarioEntity[]> {
          const categorias =  await this.repository.findAll();
           console.log("Service - Filtrar Todos", categorias);
           return categorias;
       }
   
       async insertCategoriaUsuario(data : any):Promise<CategoriaUsuarioEntity>{
           if(!data.nome){
               throw new Error('Favor informar o nome')
           }
           return this.repository.insertCategoriaUsuario(data.nome)
       }
}