"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CursoRepository = void 0;
const mysql_1 = require("../database/mysql");
class CursoRepository {
    static instance;
    cursos = [];
    constructor() {
        this.createTable();
    }
    async createTable() {
        const query = `
          CREATE TABLE IF NOT EXISTS biblioteca.Curso (
              id INT AUTO_INCREMENT PRIMARY KEY,
              nome VARCHAR(255) NOT NULL
          )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Query executada com sucesso:', resultado);
            const queryCount = `SELECT COUNT(*) as total FROM biblioteca.Curso`;
            const resultadoCount = await (0, mysql_1.executarComandoSQL)(queryCount, []);
            const total = resultadoCount[0].total;
            if (total === 0) {
                const cursosIniciais = ["ADS", "Pedagogia", "Administracao"];
                for (const nome of cursosIniciais) {
                    await (0, mysql_1.executarComandoSQL)(`INSERT INTO biblioteca.Curso (nome) VALUES (?)`, [nome]);
                }
                console.log("Cursos inicias inseridos com sucesso.");
            }
        }
        catch (err) {
            console.error('Error: ' + err);
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CursoRepository();
        }
        return this.instance;
    }
    async findAll() {
        const query = "SELECT * FROM biblioteca.Curso";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao listar cursos gerando o erro: ${err}`);
            throw err;
        }
    }
    findById(id) {
        return this.cursos.find(c => c.id === id);
    }
}
exports.CursoRepository = CursoRepository;
