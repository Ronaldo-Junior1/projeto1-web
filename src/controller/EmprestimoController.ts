import { Body, Controller, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { EmprestimoService } from "../service/EmprestimoService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { EmprestimoRequestDto } from "../model/dto/EmprestimoRequestDto";

@Route("emprestimos")
@Tags("Emprestimo")
export class EmprestimoController extends Controller {
    private emprestimoService = new EmprestimoService();

    @Post()
    public async realizarEmprestimo(
        @Body() dto: EmprestimoRequestDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoEmprestimo = await this.emprestimoService.novoEmprestimo(dto);
            return success(201, new BasicResponseDto("Empréstimo registrado com sucesso!", novoEmprestimo));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get()
    public async listarEmprestimos(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimos = await this.emprestimoService.listarEmprestimos();
            return success(200, new BasicResponseDto("Empréstimos listados com sucesso!", emprestimos));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("{id}/devolucao")
    public async realizarDevolucao(
        @Path() id: number,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const emprestimoDevolvido = await this.emprestimoService.registrarDevolucao(id);
            return success(200, new BasicResponseDto("Devolução registrada com sucesso!", emprestimoDevolvido));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}