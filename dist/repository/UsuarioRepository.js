"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRepository = void 0;
const mysql_1 = require("../database/mysql");
class UsuarioRepository {
    static instance;
    constructor() {
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Usuario (
            id INT AUTO_INCREMENT PRIMARY KEY,
            nome VARCHAR(100) NOT NULL,
            cpf VARCHAR(11) NOT NULL UNIQUE,
            status ENUM('ATIVO', 'SUSPENSO', 'INATIVO') NOT NULL,
            categoria_id INT NOT NULL,
            curso_id INT NOT NULL
        )`;
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Usuario verificada/criada com sucesso:', resultado);
        }
        catch (err) {
            console.error('Erro ao criar a tabela Usuario:', err);
        }
    }
    async insertUsuario(usuario) {
        const query = "INSERT INTO biblioteca.Usuario (nome, cpf, status, categoria_id, curso_id) VALUES (?, ?, ?, ?, ?)";
        const params = [usuario.nome, usuario.cpf, usuario.status, usuario.categoria_id, usuario.curso_id];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, params);
            usuario.id = resultado.insertId;
            console.log('Usuário inserido com sucesso, ID:', usuario.id);
            return new Promise((resolve) => {
                resolve(usuario);
            });
        }
        catch (err) {
            console.error('Erro ao inserir o usuário:', err);
            throw err;
        }
    }
    async updateUsuario(usuario) {
        const query = "UPDATE biblioteca.Usuario SET nome = ?, cpf = ?, status = ?, categoria_id = ?, curso_id = ? WHERE id = ?";
        const params = [usuario.nome, usuario.cpf, usuario.status, usuario.categoria_id, usuario.curso_id, usuario.id];
        try {
            await (0, mysql_1.executarComandoSQL)(query, params);
            console.log('Usuário atualizado com sucesso, ID:', usuario.id);
            return new Promise((resolve) => {
                resolve(usuario);
            });
        }
        catch (err) {
            console.error(`Erro ao atualizar o usuário de ID ${usuario.id}:`, err);
            throw err;
        }
    }
    async deleteUsuario(id) {
        const query = "DELETE FROM biblioteca.Usuario WHERE id = ?";
        try {
            await (0, mysql_1.executarComandoSQL)(query, [id]);
            console.log('Usuário deletado com sucesso, ID:', id);
            return new Promise((resolve) => {
                resolve(id);
            });
        }
        catch (err) {
            console.error(`Falha ao deletar o usuário de ID ${id}:`, err);
            throw err;
        }
    }
    async filterUsuarioById(id) {
        const query = "SELECT * FROM biblioteca.Usuario WHERE id = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            if (resultado.length === 0) {
                throw new Error(`Usuário com ID ${id} não encontrado.`);
            }
            console.log('Usuário localizado com sucesso, ID:', id);
            return new Promise((resolve) => {
                resolve(resultado[0]);
            });
        }
        catch (err) {
            console.error(`Falha ao procurar o usuário de ID ${id}:`, err);
            throw err;
        }
    }
    async filterUsuarioByCpf(cpf) {
        const query = "SELECT * FROM biblioteca.Usuario WHERE cpf = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [cpf]);
            if (resultado.length === 0) {
                throw new Error(`Usuário com CPF ${cpf} não encontrado.`);
            }
            console.log('Usuário localizado com sucesso, CPF:', cpf);
            return new Promise((resolve) => {
                resolve(resultado[0]);
            });
        }
        catch (err) {
            console.error(`Falha ao procurar o usuário com CPF ${cpf}:`, err);
            throw err;
        }
    }
    async filterAllUsuario() {
        const query = "SELECT * FROM biblioteca.Usuario";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Usuários listados com sucesso.');
            return new Promise((resolve) => {
                resolve(resultado);
            });
        }
        catch (err) {
            console.error(`Falha ao listar os usuários:`, err);
            throw err;
        }
    }
    async findUsuariosPorStatus(status) {
        const query = "SELECT * FROM biblioteca.Usuario WHERE status IN (?)";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [status]);
            return new Promise(resolve => resolve(resultado));
        }
        catch (err) {
            console.error(`Falha ao buscar usuários pelo status:`, err);
            throw err;
        }
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }
}
exports.UsuarioRepository = UsuarioRepository;
