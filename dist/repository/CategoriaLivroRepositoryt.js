"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const CategoriaLivroEntity_1 = require("../model/entity/CategoriaLivroEntity");
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    static instance;
    categorias = [];
    constructor() {
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(1, "Computação"));
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(2, "Letras"));
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(3, "Gestão"));
        this.categorias.push(new CategoriaLivroEntity_1.CategoriaLivroEntity(4, "Romance"));
        this.createTable();
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.CategoriaLivro (
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
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaLivroRepository();
        }
        return this.instance;
    }
    findAll() {
        return this.categorias;
    }
    findById(id) {
        return this.categorias.find(c => c.id === id);
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
