import { Request, Response } from "express";
import { CategoriaUsuarioService } from "../service/CategoriaUsuarioService";
import { Body, Controller, Delete, Get, Path, Post, Put, Query, Res, Route, Tags, TsoaResponse } from "tsoa";
import { CategoriaUsuarioDto } from "../model/dto/CategoriaUsuarioDto";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { CategoriaUsuarioEntity } from "../model/entity/CategoriaUsuarioEntity";

@Route("categoria-usuario")
@Tags("Categoria-usuario")
export class CategoriaUsuarioController {
    private service = new CategoriaUsuarioService();

        @Post()
        async cadastrarCategoriaUsuario( @Body() dto: CategoriaUsuarioDto,
            @Res() fail: TsoaResponse<400, BasicResponseDto>,
            @Res() success: TsoaResponse<201, BasicResponseDto>): Promise<void>{
            try{
                const newCategoriaUsuario = await this.service.insertCategoriaUsuario(dto)
                return success(201, new BasicResponseDto("Categoria de usuario criado com sucesso!", newCategoriaUsuario));
            }catch(error: any){
                return fail(400, new BasicResponseDto(error.message, undefined));
            }
        }
    
        @Get("all")
        async listarCategoriasUsuario( 
            @Res() notFound: TsoaResponse<400, BasicResponseDto>,
            @Res() success: TsoaResponse<200, BasicResponseDto>): Promise<void> {
            try {
                const categorias: CategoriaUsuarioEntity[] = await this.service.listarCategoriasUsuario();
                return success(200, new BasicResponseDto("Categorias de usuario listadas com sucesso!", categorias));
            } catch (error: any) {
                return notFound(400, new BasicResponseDto(error.message, undefined));
            }
        }
}