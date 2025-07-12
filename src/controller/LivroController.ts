import { Body, Controller, Delete, Get, Path, Post, Put, Res, Route, Tags, TsoaResponse } from "tsoa";
import { LivroService } from "../service/LivroService";
import { BasicResponseDto } from "../model/dto/BasicResponseDto";
import { LivroRequestDto } from "../model/dto/LivroRequestDto";
import { LivroUpdateRequestDto } from "../model/dto/LivroUpdateRequestDto";

@Route("livros")
@Tags("Livro")
export class LivroController extends Controller {
    private livroService = new LivroService();

    @Post()
    public async cadastrarLivro(
        @Body() dto: LivroRequestDto,
        @Res() fail: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<201, BasicResponseDto>
    ): Promise<void> {
        try {
            const novoLivro = await this.livroService.novoLivro(dto);
            return success(201, new BasicResponseDto("Livro cadastrado com sucesso!", novoLivro));
        } catch (error: any) {
            return fail(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("todos")
    public async listarLivros(
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livros = await this.livroService.listarLivros();
            return success(200, new BasicResponseDto("Livros listados com sucesso!", livros));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Get("{isbn}")
    public async detalharLivro(
        @Path() isbn: string,
        @Res() notFound: TsoaResponse<404, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livro = await this.livroService.buscarLivroPorIsbn(isbn);
            return success(200, new BasicResponseDto("Livro encontrado com sucesso!", livro));
        } catch (error: any) {
            return notFound(404, new BasicResponseDto(error.message, undefined));
        }
    }

    @Put("{isbn}")
    public async atualizarLivro(
        @Path() isbn: string,
        @Body() dto: LivroUpdateRequestDto,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() success: TsoaResponse<200, BasicResponseDto>
    ): Promise<void> {
        try {
            const livroAtualizado = await this.livroService.atualizarLivro(isbn, dto);
            return success(200, new BasicResponseDto("Livro atualizado com sucesso!", livroAtualizado));
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }

    @Delete("{isbn}")
    public async removerLivro(
        @Path() isbn: string,
        @Res() notFound: TsoaResponse<400, BasicResponseDto>,
        @Res() noContent: TsoaResponse<204, void>
    ): Promise<void> {
        try {
            await this.livroService.removerLivro(isbn);
            return noContent(204);
        } catch (error: any) {
            return notFound(400, new BasicResponseDto(error.message, undefined));
        }
    }
}