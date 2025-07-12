import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { UsuarioService } from "../service/UsuarioService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { UsuarioRequestDto } from "../model/dto/UsuarioRequestDto";
import { UsuarioUpdateRequestDto } from "../model/dto/UsuarioUpdateRequestDto";
import { StatusUsuario } from "../model/enum/StatusUsuario";

@Route("usuarios")
@Tags("Usuario")
export class UsuarioController extends Controller {
    private usuarioService = new UsuarioService();

    @Post()
    public async cadastrarUsuario(
        @Body() dto: UsuarioRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoUsuario = await this.usuarioService.novoUsuario(dto);
            return success(201, new BasicResponseDto("Usuário cadastrado com sucesso!", novoUsuario));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    public async listarUsuarios(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarios = await this.usuarioService.listarUsuarios();
            return success(200, new BasicResponseDto("Usuários listados com sucesso!", usuarios));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("{cpf}")
    public async detalharUsuario(
        @Path() cpf: string,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuario = await this.usuarioService.buscarUsuarioPorCPF(cpf);
            return success(200, new BasicResponseDto("Usuário encontrado com sucesso!", usuario));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("{cpf}")
    public async atualizarUsuario(
        @Path() cpf: string,
        @Body() dto: UsuarioUpdateRequestDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const usuarioAtualizado = await this.usuarioService.atualizarUsuario(cpf, dto);
            return success(200, new BasicResponseDto("Usuário atualizado com sucesso!", usuarioAtualizado));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
    
    @Delete("{cpf}")
    public async removerUsuario(
        @Path() cpf: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() noContent: TsoaResponse<204, void>
    ): Promise<void> {
        try {
            await this.usuarioService.removerUsuario(cpf);
            return noContent(204);
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}