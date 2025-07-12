"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
const CategoriaUsuarioEntity_1 = require("../model/entity/CategoriaUsuarioEntity");
class CategoriaUsuarioRepository {
    static instance;
    categorias = [];
    constructor() {
        this.categorias.push(new CategoriaUsuarioEntity_1.CategoriaUsuarioEntity(1, "Professor"));
        this.categorias.push(new CategoriaUsuarioEntity_1.CategoriaUsuarioEntity(2, "Aluno"));
        this.categorias.push(new CategoriaUsuarioEntity_1.CategoriaUsuarioEntity(3, "Bibliotecário"));
        this.createTable();
    }
    async createTable() {
        const query = `
          CREATE TABLE IF NOT EXISTS biblioteca.CategoriaUsuario (
              id INT AUTO_INCREMENT PRIMARY KEY,
              nome VARCHAR(255) NOT NULL
          )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Query executada com sucesso:', resultado);
        }
        catch (err) {
            console.error('Error: ' + err);
        }
    }
    async insertCategoriaUsuario(nome) {
        const resultado = await (0, mysql_1.executarComandoSQL)("INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)", [nome]);
        const newCategoriaUsuario = new CategoriaUsuarioEntity_1.CategoriaUsuarioEntity(resultado.insertId, nome);
        console.log('Categoria Usuario inserida com sucesso:', newCategoriaUsuario);
        return newCategoriaUsuario;
    }
    async findAll() {
        const query = "SELECT * FROM biblioteca.CategoriaUsuario";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao listar as categorias gerando o erro: ${err}`);
            throw err;
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
    findById(id) {
        return this.categorias.find(c => c.id === id);
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
