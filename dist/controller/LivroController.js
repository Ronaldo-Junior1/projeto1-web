"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroController = void 0;
const tsoa_1 = require("tsoa");
const LivroService_1 = require("../service/LivroService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const LivroRequestDto_1 = require("../model/dto/LivroRequestDto");
const LivroUpdateRequestDto_1 = require("../model/dto/LivroUpdateRequestDto");
let LivroController = class LivroController extends tsoa_1.Controller {
    livroService = new LivroService_1.LivroService();
    async cadastrarLivro(dto, fail, success) {
        try {
            const novoLivro = await this.livroService.novoLivro(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Livro cadastrado com sucesso!", novoLivro));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarLivros(notFound, success) {
        try {
            const livros = await this.livroService.listarLivros();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livros listados com sucesso!", livros));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async detalharLivro(isbn, notFound, success) {
        try {
            const livro = await this.livroService.buscarLivroPorIsbn(isbn);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro encontrado com sucesso!", livro));
        }
        catch (error) {
            return notFound(404, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarLivro(isbn, dto, notFound, success) {
        try {
            const livroAtualizado = await this.livroService.atualizarLivro(isbn, dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Livro atualizado com sucesso!", livroAtualizado));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async removerLivro(isbn, notFound, noContent) {
        try {
            await this.livroService.removerLivro(isbn);
            return noContent(204);
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.LivroController = LivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LivroRequestDto_1.LivroRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "cadastrarLivro", null);
__decorate([
    (0, tsoa_1.Get)("todos"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "listarLivros", null);
__decorate([
    (0, tsoa_1.Get)("{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "detalharLivro", null);
__decorate([
    (0, tsoa_1.Put)("{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, LivroUpdateRequestDto_1.LivroUpdateRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "atualizarLivro", null);
__decorate([
    (0, tsoa_1.Delete)("{isbn}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], LivroController.prototype, "removerLivro", null);
exports.LivroController = LivroController = __decorate([
    (0, tsoa_1.Route)("livros"),
    (0, tsoa_1.Tags)("Livro")
], LivroController);
