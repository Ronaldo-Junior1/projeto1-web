"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaUsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
class CategoriaUsuarioRepository {
    static instance;
    categorias = [];
    constructor() {
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
            const queryCount = `SELECT COUNT(*) as total FROM biblioteca.CategoriaUsuario`;
            const resultadoCount = await (0, mysql_1.executarComandoSQL)(queryCount, []);
            const total = resultadoCount[0].total;
            if (total === 0) {
                const categoriasIniciais = ["Professor", "Aluno", "Bibliotecário"];
                for (const nome of categoriasIniciais) {
                    await (0, mysql_1.executarComandoSQL)(`INSERT INTO biblioteca.CategoriaUsuario (nome) VALUES (?)`, [nome]);
                }
                console.log("Categorias iniciais inseridas com sucesso.");
            }
        }
        catch (err) {
            console.error('Error: ' + err);
        }
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
    async findById(id) {
        const query = `SELECT * FROM biblioteca.CategoriaUsuario WHERE id = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            if (resultado.length === 0) {
                throw new Error("Categoria não encontrada com o ID fornecido");
            }
            console.log(`Categoria com ID ${id} localizada com sucesso.`);
            return new Promise((resolve) => {
                resolve(resultado[0]);
            });
        }
        catch (error) {
            console.error(`Falha ao buscar categoria pelo ID ${id}:`, error);
            throw error;
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CategoriaUsuarioRepository();
        }
        return this.instance;
    }
}
exports.CategoriaUsuarioRepository = CategoriaUsuarioRepository;
