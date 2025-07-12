"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
const mysql_1 = require("../database/mysql");
class LivroRepository {
    static instance;
    livros = [];
    constructor() {
        this.createTable();
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Livro (
            id INT AUTO_INCREMENT PRIMARY KEY,
            titulo VARCHAR(255) NOT NULL,
            autor VARCHAR(255) NOT NULL,
            editora VARCHAR(255) NOT NULL,
            edicao VARCHAR(50) NOT NULL,
            isbn VARCHAR(20) NOT NULL UNIQUE,
            categoria_id INT NOT NULL
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
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    async insereLivro(livro) {
        const query = `INSERT INTO biblioteca.Livro (titulo, autor, editora, edicao, isbn, categoria_id) VALUES (?, ?, ?, ?, ?, ?)`;
        const params = [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.isbn, livro.categoria_id];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, params);
            livro.id = resultado.insertId;
            console.log('Livro inserido com sucesso:', livro);
            return new Promise((resolve) => {
                resolve(livro);
            });
        }
        catch (error) {
            console.error(`Erro ao inserir o livro com ISBN ${livro.isbn}:`, error);
            throw error;
        }
    }
    async findAll() {
        const query = "SELECT * FROM biblioteca.Livro";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Todos os livros foram listados com sucesso.');
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (error) {
            console.error('Falha ao listar todos os livros:', error);
            throw error;
        }
    }
    async findByIsbn(isbn) {
        const query = `SELECT * FROM biblioteca.Livro WHERE isbn = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
            if (resultado.length === 0) {
                throw new Error("Livro não encontrado com o ISBN fornecido");
            }
            console.log(`Livro com ISBN ${isbn} localizado com sucesso.`);
            return new Promise((resolve) => {
                resolve(resultado[0]);
            });
        }
        catch (error) {
            console.error(`Falha ao buscar livro pelo ISBN ${isbn}:`, error);
            throw error;
        }
    }
    async findById(id) {
        const query = `SELECT * FROM biblioteca.Livro WHERE id = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            if (resultado.length === 0) {
                throw new Error("Livro não encontrado com o ID fornecido");
            }
            console.log(`Livro com ID ${id} localizado com sucesso.`);
            return new Promise((resolve) => {
                resolve(resultado[0]);
            });
        }
        catch (error) {
            console.error(`Falha ao buscar livro pelo ID ${id}:`, error);
            throw error;
        }
    }
    async findByAutorEditoraEdicao(autor, editora, edicao) {
        const query = `SELECT * FROM biblioteca.Livro WHERE autor = ? AND editora = ? AND edicao = ?`;
        const params = [autor, editora, edicao];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, params);
            if (resultado.length === 0) {
                throw new Error("Livro não encontrado com os critérios de autor, editora e edição fornecidos");
            }
            console.log(`Livro localizado por autor/editora/edição.`);
            return new Promise((resolve) => {
                resolve(resultado[0]);
            });
        }
        catch (error) {
            console.error(`Falha ao buscar livro por autor/editora/edição:`, error);
            throw error;
        }
    }
    async removeLivroPorIsbn(isbn) {
        const query = `DELETE FROM biblioteca.Livro WHERE isbn = ?`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [isbn]);
            if (resultado.affectedRows === 0) {
                throw new Error("Nenhum livro encontrado com o ISBN fornecido para ser removido.");
            }
            console.log(`Livro com ISBN ${isbn} removido com sucesso.`);
            return new Promise((resolve) => {
                resolve();
            });
        }
        catch (error) {
            console.error(`Falha ao remover o livro com ISBN ${isbn}:`, error);
            throw error;
        }
    }
    async updateLivroPorIsbn(livro) {
        const query = `UPDATE Livro SET titulo = ?, autor = ?, editora = ?, edicao = ?, categoria_id = ? WHERE id = ?`;
        const params = [livro.titulo, livro.autor, livro.editora, livro.edicao, livro.categoria_id, livro.id];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, params);
            if (resultado.affectedRows === 0) {
                throw new Error('Nenhum livro foi atualizado, verifique o ID.');
            }
            console.log(`Livro com ID ${livro.id} atualizado com sucesso.`);
            return new Promise((resolve) => {
                resolve(livro);
            });
        }
        catch (error) {
            console.error(`Falha ao atualizar o livro com ID ${livro.id}:`, error);
            throw error;
        }
    }
}
exports.LivroRepository = LivroRepository;
