"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaLivroRepository = void 0;
const mysql_1 = require("../database/mysql");
class CategoriaLivroRepository {
    static instance;
    categorias = [];
    constructor() {
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
            const queryCount = `SELECT COUNT(*) as total FROM biblioteca.CategoriaLivro`;
            const resultadoCount = await (0, mysql_1.executarComandoSQL)(queryCount, []);
            const total = resultadoCount[0].total;
            if (total === 0) {
                const categoriasIniciais = ["Computação", "Letras", "Gestão", "Romance"];
                for (const nome of categoriasIniciais) {
                    await (0, mysql_1.executarComandoSQL)(`INSERT INTO biblioteca.CategoriaLivro (nome) VALUES (?)`, [nome]);
                }
                console.log("Categorias iniciais inseridas com sucesso.");
            }
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
    async findAll() {
        const query = "SELECT * FROM biblioteca.CategoriaLivro";
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
    //to-do
    findById(id) {
        return this.categorias.find(c => c.id === id);
    }
}
exports.CategoriaLivroRepository = CategoriaLivroRepository;
