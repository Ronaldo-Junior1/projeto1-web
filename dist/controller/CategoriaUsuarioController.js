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
exports.CategoriaUsuarioController = void 0;
const CategoriaUsuarioService_1 = require("../service/CategoriaUsuarioService");
const tsoa_1 = require("tsoa");
const CategoriaUsuarioDto_1 = require("../model/dto/CategoriaUsuarioDto");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
let CategoriaUsuarioController = class CategoriaUsuarioController {
    service = new CategoriaUsuarioService_1.CategoriaUsuarioService();
    async cadastrarCategoriaUsuario(dto, fail, success) {
        try {
            const newCategoriaUsuario = await this.service.insertCategoriaUsuario(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Categoria de usuario criado com sucesso!", newCategoriaUsuario));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarCategoriasUsuario(notFound, success) {
        try {
            const categorias = await this.service.listarCategoriasUsuario();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Categorias de usuario listadas com sucesso!", categorias));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.CategoriaUsuarioController = CategoriaUsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CategoriaUsuarioDto_1.CategoriaUsuarioDto, Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaUsuarioController.prototype, "cadastrarCategoriaUsuario", null);
__decorate([
    (0, tsoa_1.Get)("all"),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], CategoriaUsuarioController.prototype, "listarCategoriasUsuario", null);
exports.CategoriaUsuarioController = CategoriaUsuarioController = __decorate([
    (0, tsoa_1.Route)("categoria-usuario"),
    (0, tsoa_1.Tags)("Categoria-usuario")
], CategoriaUsuarioController);
