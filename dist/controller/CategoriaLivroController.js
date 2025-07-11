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
exports.CategoriaLivroController = void 0;
const CategoriaLivroService_1 = require("../service/CategoriaLivroService");
const tsoa_1 = require("tsoa");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const CategoriaLivroDto_1 = require("../model/dto/CategoriaLivroDto");
let CategoriaLivroController = class CategoriaLivroController {
    service = new CategoriaLivroService_1.CategoriaLivroService();
    async cadastrarCategoriaLivro(dto, fail, success) {
        try {
            const newCategoriaLivro = await this.service.insertCategoriaLivro(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Categoria de livro criado com sucesso!", newCategoriaLivro));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarCategoriasLivros(notFound, success) {
        try {
            const categorias = await this.service.listarCategoriasLivro();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Categorias de livro listadas com sucesso!", categorias));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.CategoriaLivroController = CategoriaLivroController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaLivroDto_1.CategoriaLivroDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaLivroController.prototype, "cadastrarCategoriaLivro", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaLivroController.prototype, "listarCategoriasLivros", null);
exports.CategoriaLivroController = CategoriaLivroController = __decorate([
    (0, tsoa_1.Route)("categoria-livro"),
    (0, tsoa_1.Tags)("Categoria-livro")
], CategoriaLivroController);
