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
exports.EstoqueController = void 0;
const tsoa_1 = require("tsoa");
const EstoqueService_1 = require("../service/EstoqueService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const EstoqueRequestDto_1 = require("../model/dto/EstoqueRequestDto");
const EstoqueUpdateRequestDto_1 = require("../model/dto/EstoqueUpdateRequestDto");
let EstoqueController = class EstoqueController extends tsoa_1.Controller {
    estoqueService = new EstoqueService_1.EstoqueService();
    async cadastrarExemplar(dto, fail, success) {
        try {
            const novoExemplar = await this.estoqueService.novoExemplar(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Exemplar cadastrado com sucesso!", novoExemplar));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarExemplaresDisponiveis(fail, success) {
        try {
            const exemplares = await this.estoqueService.listarEstoqueDisponivel();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Exemplares disponíveis listados com sucesso!", exemplares));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async detalharExemplar(codigo, notFound, success) {
        try {
            const exemplar = await this.estoqueService.buscarPorCodigo(codigo);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Exemplar encontrado com sucesso!", exemplar));
        }
        catch (error) {
            return notFound(404, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarQuantidade(codigo, dto, fail, success) {
        try {
            const exemplarAtualizado = await this.estoqueService.atualizarQuantidade(codigo, dto.quantidade);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Quantidade do exemplar atualizada com sucesso!", exemplarAtualizado));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async removerExemplar(codigo, fail, noContent) {
        try {
            await this.estoqueService.removerExemplar(codigo);
            return noContent(204);
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.EstoqueController = EstoqueController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [EstoqueRequestDto_1.EstoqueRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "cadastrarExemplar", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "listarExemplaresDisponiveis", null);
__decorate([
    (0, tsoa_1.Get)("{codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "detalharExemplar", null);
__decorate([
    (0, tsoa_1.Put)("{codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, EstoqueUpdateRequestDto_1.EstoqueUpdateRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "atualizarQuantidade", null);
__decorate([
    (0, tsoa_1.Delete)("{codigo}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Function, Function]),
    __metadata("design:returntype", Promise)
], EstoqueController.prototype, "removerExemplar", null);
exports.EstoqueController = EstoqueController = __decorate([
    (0, tsoa_1.Route)("estoque"),
    (0, tsoa_1.Tags)("Estoque")
], EstoqueController);
