import { Request, Response } from "express";
import { CategoriaLivroService } from "../service/CategoriaLivroService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaLivroEntity } from "../model/entity/CategoriaLivroEntity";
import { CategoriaLivroDto } from "../model/dto/CategoriaLivroDto";

@Route("categoria-livro")
@Tags("Categoria-livro")
export class CategoriaLivroController {
    private service = new CategoriaLivroService();

    @Post()
    async cadastrarCategoriaLivro( @Body() dto: CategoriaLivroDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>): Promise<void>{
        try{
            const newCategoriaLivro = await this.service.insertCategoriaLivro(dto)
            return success(201, new BasicResponseDto("Produto criado com sucesso!", newCategoriaLivro));
        }catch(error: any){
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("all")
    async listarCategoriasLivros( 
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>): Promise<void> {
        try {
            const categorias: CategoriaLivroEntity[] = await this.service.listarCategoriasLivro();
            return success(200, new BasicResponseDto("Categorias de livro listadas com sucesso!", categorias));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}