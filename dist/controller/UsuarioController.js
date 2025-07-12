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
exports.UsuarioController = void 0;
const tsoa_1 = require("tsoa");
const UsuarioService_1 = require("../service/UsuarioService");
const BasicResponseDto_1 = require("../model/dto/BasicResponseDto");
const UsuarioRequestDto_1 = require("../model/dto/UsuarioRequestDto");
const UsuarioUpdateRequestDto_1 = require("../model/dto/UsuarioUpdateRequestDto");
let UsuarioController = class UsuarioController extends tsoa_1.Controller {
    usuarioService = new UsuarioService_1.UsuarioService();
    async cadastrarUsuario(dto, fail, success) {
        try {
            const novoUsuario = await this.usuarioService.novoUsuario(dto);
            return success(201, new BasicResponseDto_1.BasicResponseDto("Usuário cadastrado com sucesso!", novoUsuario));
        }
        catch (error) {
            return fail(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async listarUsuarios(notFound, success) {
        try {
            const usuarios = await this.usuarioService.listarUsuarios();
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuários listados com sucesso!", usuarios));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async detalharUsuario(cpf, notFound, success) {
        try {
            const usuario = await this.usuarioService.buscarUsuarioPorCPF(cpf);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário encontrado com sucesso!", usuario));
        }
        catch (error) {
            return notFound(404, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async atualizarUsuario(cpf, dto, notFound, success) {
        try {
            const usuarioAtualizado = await this.usuarioService.atualizarUsuario(cpf, dto);
            return success(200, new BasicResponseDto_1.BasicResponseDto("Usuário atualizado com sucesso!", usuarioAtualizado));
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
    async removerUsuario(cpf, notFound, noContent) {
        try {
            await this.usuarioService.removerUsuario(cpf);
            return noContent(204);
        }
        catch (error) {
            return notFound(400, new BasicResponseDto_1.BasicResponseDto(error.message, undefined));
        }
    }
};
exports.UsuarioController = UsuarioController;
__decorate([
    (0, tsoa_1.Post)(),
    __param(0, (0, tsoa_1.Body)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UsuarioRequestDto_1.UsuarioRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "cadastrarUsuario", null);
__decorate([
    (0, tsoa_1.Get)(),
    __param(0, (0, tsoa_1.Res)()),
    __param(1, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "listarUsuarios", null);
__decorate([
    (0, tsoa_1.Get)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "detalharUsuario", null);
__decorate([
    (0, tsoa_1.Put)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __param(2, (0, tsoa_1.Res)()),
    __param(3, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UsuarioUpdateRequestDto_1.UsuarioUpdateRequestDto, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "atualizarUsuario", null);
__decorate([
    (0, tsoa_1.Delete)("{cpf}"),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Res)()),
    __param(2, (0, tsoa_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Function, Function]),
    __metadata("design:returntype", Promise)
], UsuarioController.prototype, "removerUsuario", null);
exports.UsuarioController = UsuarioController = __decorate([
    (0, tsoa_1.Route)("usuarios"),
    (0, tsoa_1.Tags)("Usuario")
], UsuarioController);
