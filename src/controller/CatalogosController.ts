import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { CursoEntity } from "../model/entity/CursoEntity";
import { CursoService } from "../service/CursoService";

@Route("catalogos")
@Tags("Catalogos")
export class CatalogosController extends Controller{
    private serviceLivros = new CategoriaLivroService();
    private serviceUsuarios = new CategoriaUsuarioService();
    private serviceCursos = new CursoService();

    @Get("categorias-livro")
    async listarCategoriasLivros( 
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>): Promise<void> {
        try {
            const categorias: CategoriaLivroEntity[] = await this.serviceLivros.listarCategoriasLivro();
            return success(200, new BasicResponseDto("Categorias de livro listadas com sucesso!", categorias));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("categorias-usuario")
        async listarCategoriasUsuario( 
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>): Promise<void> {
        try {
            const categorias: CategoriaUsuarioEntity[] = await this.serviceUsuarios.listarCategoriasUsuario();
            return success(200, new BasicResponseDto("Categorias de usuario listadas com sucesso!", categorias));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("cursos")
        async listarCursos( 
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>): Promise<void> {
        try {
            const cursos: CursoEntity[] = await this.serviceCursos.listarCursos();
            return success(200, new BasicResponseDto("Cursos listados com sucesso!", cursos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}