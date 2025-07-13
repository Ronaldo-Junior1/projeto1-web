/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UsuarioController } from './../controller/UsuarioController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LivroController } from './../controller/LivroController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { EstoqueController } from './../controller/EstoqueController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CategoriaLivroController } from './../controller/CatalogosController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UsuarioRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string","required":true},
            "cpf": {"dataType":"string","required":true},
            "categoria_id": {"dataType":"double","required":true},
            "curso_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicResponseDto": {
        "dataType": "refObject",
        "properties": {
            "message": {"dataType":"string","required":true},
            "object": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusUsuario": {
        "dataType": "refEnum",
        "enums": ["ATIVO","SUSPENSO","INATIVO"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UsuarioUpdateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "nome": {"dataType":"string"},
            "status": {"ref":"StatusUsuario"},
            "categoria_id": {"dataType":"double"},
            "curso_id": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroRequestDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string","required":true},
            "isbn": {"dataType":"string","required":true},
            "autor": {"dataType":"string","required":true},
            "editora": {"dataType":"string","required":true},
            "edicao": {"dataType":"string","required":true},
            "categoria_id": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LivroUpdateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "titulo": {"dataType":"string"},
            "autor": {"dataType":"string"},
            "editora": {"dataType":"string"},
            "edicao": {"dataType":"string"},
            "categoria_id": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueRequestDto": {
        "dataType": "refObject",
        "properties": {
            "isbn": {"dataType":"string","required":true},
            "codigo_exemplar": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EstoqueUpdateRequestDto": {
        "dataType": "refObject",
        "properties": {
            "quantidade": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUsuarioController_cadastrarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioRequestDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.cadastrarUsuario)),

            async function UsuarioController_cadastrarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_cadastrarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'cadastrarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_listarUsuarios: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.listarUsuarios)),

            async function UsuarioController_listarUsuarios(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_listarUsuarios, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'listarUsuarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_detalharUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.detalharUsuario)),

            async function UsuarioController_detalharUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_detalharUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'detalharUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_atualizarUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                dto: {"in":"body","name":"dto","required":true,"ref":"UsuarioUpdateRequestDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.atualizarUsuario)),

            async function UsuarioController_atualizarUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_atualizarUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'atualizarUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUsuarioController_removerUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                cpf: {"in":"path","name":"cpf","required":true,"dataType":"string"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                noContent: {"in":"res","name":"204","required":true,"dataType":"void"},
        };
        app.delete('/usuarios/:cpf',
            ...(fetchMiddlewares<RequestHandler>(UsuarioController)),
            ...(fetchMiddlewares<RequestHandler>(UsuarioController.prototype.removerUsuario)),

            async function UsuarioController_removerUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUsuarioController_removerUsuario, request, response });

                const controller = new UsuarioController();

              await templateService.apiHandler({
                methodName: 'removerUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_cadastrarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroRequestDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.cadastrarLivro)),

            async function LivroController_cadastrarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_cadastrarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'cadastrarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_listarLivros: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.listarLivros)),

            async function LivroController_listarLivros(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_listarLivros, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'listarLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_detalharLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.detalharLivro)),

            async function LivroController_detalharLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_detalharLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'detalharLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_atualizarLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                dto: {"in":"body","name":"dto","required":true,"ref":"LivroUpdateRequestDto"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.atualizarLivro)),

            async function LivroController_atualizarLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_atualizarLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'atualizarLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsLivroController_removerLivro: Record<string, TsoaRoute.ParameterSchema> = {
                isbn: {"in":"path","name":"isbn","required":true,"dataType":"string"},
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                noContent: {"in":"res","name":"204","required":true,"dataType":"void"},
        };
        app.delete('/livros/:isbn',
            ...(fetchMiddlewares<RequestHandler>(LivroController)),
            ...(fetchMiddlewares<RequestHandler>(LivroController.prototype.removerLivro)),

            async function LivroController_removerLivro(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsLivroController_removerLivro, request, response });

                const controller = new LivroController();

              await templateService.apiHandler({
                methodName: 'removerLivro',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_cadastrarExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                dto: {"in":"body","name":"dto","required":true,"ref":"EstoqueRequestDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"201","required":true,"ref":"BasicResponseDto"},
        };
        app.post('/estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.cadastrarExemplar)),

            async function EstoqueController_cadastrarExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_cadastrarExemplar, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'cadastrarExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_listarExemplaresDisponiveis: Record<string, TsoaRoute.ParameterSchema> = {
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.listarExemplaresDisponiveis)),

            async function EstoqueController_listarExemplaresDisponiveis(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_listarExemplaresDisponiveis, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'listarExemplaresDisponiveis',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_detalharExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                codigo: {"in":"path","name":"codigo","required":true,"dataType":"double"},
                notFound: {"in":"res","name":"404","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/estoque/:codigo',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.detalharExemplar)),

            async function EstoqueController_detalharExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_detalharExemplar, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'detalharExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_atualizarQuantidade: Record<string, TsoaRoute.ParameterSchema> = {
                codigo: {"in":"path","name":"codigo","required":true,"dataType":"double"},
                dto: {"in":"body","name":"dto","required":true,"ref":"EstoqueUpdateRequestDto"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.put('/estoque/:codigo',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.atualizarQuantidade)),

            async function EstoqueController_atualizarQuantidade(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_atualizarQuantidade, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'atualizarQuantidade',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsEstoqueController_removerExemplar: Record<string, TsoaRoute.ParameterSchema> = {
                codigo: {"in":"path","name":"codigo","required":true,"dataType":"double"},
                fail: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                noContent: {"in":"res","name":"204","required":true,"dataType":"void"},
        };
        app.delete('/estoque/:codigo',
            ...(fetchMiddlewares<RequestHandler>(EstoqueController)),
            ...(fetchMiddlewares<RequestHandler>(EstoqueController.prototype.removerExemplar)),

            async function EstoqueController_removerExemplar(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsEstoqueController_removerExemplar, request, response });

                const controller = new EstoqueController();

              await templateService.apiHandler({
                methodName: 'removerExemplar',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaLivroController_listarCategoriasLivros: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/categorias-livro',
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController.prototype.listarCategoriasLivros)),

            async function CategoriaLivroController_listarCategoriasLivros(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_listarCategoriasLivros, request, response });

                const controller = new CategoriaLivroController();

              await templateService.apiHandler({
                methodName: 'listarCategoriasLivros',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaLivroController_listarCategoriasUsuario: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/categorias-usuario',
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController.prototype.listarCategoriasUsuario)),

            async function CategoriaLivroController_listarCategoriasUsuario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_listarCategoriasUsuario, request, response });

                const controller = new CategoriaLivroController();

              await templateService.apiHandler({
                methodName: 'listarCategoriasUsuario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCategoriaLivroController_listarCursos: Record<string, TsoaRoute.ParameterSchema> = {
                notFound: {"in":"res","name":"400","required":true,"ref":"BasicResponseDto"},
                success: {"in":"res","name":"200","required":true,"ref":"BasicResponseDto"},
        };
        app.get('/catalogos/cursos',
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController)),
            ...(fetchMiddlewares<RequestHandler>(CategoriaLivroController.prototype.listarCursos)),

            async function CategoriaLivroController_listarCursos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCategoriaLivroController_listarCursos, request, response });

                const controller = new CategoriaLivroController();

              await templateService.apiHandler({
                methodName: 'listarCursos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
