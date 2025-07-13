import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EstoqueService } from "../service/EstoqueService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EstoqueRequestDto } from "../model/dto/EstoqueRequestDto";
import { EstoqueUpdateRequestDto } from "../model/dto/EstoqueUpdateRequestDto";

@Route("estoque")
@Tags("Estoque")
export class EstoqueController extends Controller {
    private estoqueService = new EstoqueService();

    @Post()
    public async cadastrarExemplar(
        @Body() dto: EstoqueRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoExemplar = await this.estoqueService.novoExemplar(dto);
            return success(201, new BasicResponseDto("Exemplar cadastrado com sucesso!", novoExemplar));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    public async listarExemplaresDisponiveis(
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const exemplares = await this.estoqueService.listarEstoqueDisponivel();
            return success(200, new BasicResponseDto("Exemplares disponíveis listados com sucesso!", exemplares));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("{codigo}")
    public async detalharExemplar(
        @Path() codigo: number,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const exemplar = await this.estoqueService.buscarPorCodigo(codigo);
            return success(200, new BasicResponseDto("Exemplar encontrado com sucesso!", exemplar));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("{codigo}")
    public async atualizarQuantidade(
        @Path() codigo: number,
        @Body() dto: EstoqueUpdateRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const exemplarAtualizado = await this.estoqueService.atualizarQuantidade(codigo, dto.quantidade);
            return success(200, new BasicResponseDto("Quantidade do exemplar atualizada com sucesso!", exemplarAtualizado));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete("{codigo}")
    public async removerExemplar(
        @Path() codigo: number,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() noContent: TsoaResponse<204, void>
    ): Promise<void> {
        try {
            await this.estoqueService.removerExemplar(codigo);
            return noContent(204);
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }
}