"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmprestimoRepository = void 0;
const mysql_1 = require("../database/mysql");
class EmprestimoRepository {
    static instance;
    constructor() {
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EmprestimoRepository();
        }
        return this.instance;
    }
    async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Emprestimo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            usuario_id INT NOT NULL,
            estoque_id INT NOT NULL,
            data_emprestimo DATE NOT NULL,
            data_devolucao DATE NOT NULL,
            data_entrega DATE NULL,
            dias_atraso INT NOT NULL DEFAULT 0,
            suspensao_ate DATE NULL
        )`;
        try {
            await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Tabela Emprestimo verificada/criada com sucesso.');
        }
        catch (err) {
            console.error('Erro ao criar a tabela Emprestimo:', err);
        }
    }
    async insertEmprestimo(emprestimo) {
        const query = `INSERT INTO biblioteca.Emprestimo 
                       (usuario_id, estoque_id, data_emprestimo, data_devolucao, dias_atraso, data_entrega, suspensao_ate) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const params = [
            emprestimo.usuario_id,
            emprestimo.estoque_id,
            emprestimo.data_emprestimo,
            emprestimo.data_devolucao,
            emprestimo.dias_atraso,
            emprestimo.data_entrega,
            emprestimo.suspensao_ate
        ];
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, params);
            emprestimo.id = resultado.insertId;
            console.log('Empréstimo registrado com sucesso, ID:', emprestimo.id);
            return new Promise(resolve => resolve(emprestimo));
        }
        catch (err) {
            console.error('Erro ao registrar o empréstimo:', err);
            throw err;
        }
    }
    async updateEmprestimo(emprestimo) {
        const query = `UPDATE biblioteca.Emprestimo SET 
                       data_entrega = ?, dias_atraso = ?, suspensao_ate = ?
                       WHERE id = ?`;
        const params = [emprestimo.data_entrega, emprestimo.dias_atraso, emprestimo.suspensao_ate, emprestimo.id];
        try {
            await (0, mysql_1.executarComandoSQL)(query, params);
            console.log(`Empréstimo ID ${emprestimo.id} atualizado com sucesso.`);
            return new Promise(resolve => resolve(emprestimo));
        }
        catch (err) {
            console.error(`Falha ao atualizar o empréstimo ID ${emprestimo.id}:`, err);
            throw err;
        }
    }
    async findAll() {
        const query = "SELECT * FROM biblioteca.Emprestimo";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            console.log('Empréstimos listados com sucesso.');
            return new Promise(resolve => resolve(resultado));
        }
        catch (err) {
            console.error('Falha ao listar os empréstimos:', err);
            throw err;
        }
    }
    async findById(id) {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE id = ?";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [id]);
            if (resultado.length === 0) {
                throw new Error(`Empréstimo com ID ${id} não encontrado.`);
            }
            console.log('Empréstimo localizado com sucesso, ID:', id);
            return new Promise(resolve => resolve(resultado[0]));
        }
        catch (err) {
            console.error(`Falha ao procurar o empréstimo de ID ${id}:`, err);
            throw err;
        }
    }
    async findAtivosByUsuarioId(usuario_id) {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE usuario_id = ? AND data_entrega IS NULL";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [usuario_id]);
            console.log(`Empréstimos ativos para o usuário ID ${usuario_id} listados com sucesso.`);
            return new Promise(resolve => resolve(resultado));
        }
        catch (err) {
            console.error(`Falha ao listar empréstimos ativos para o usuário ID ${usuario_id}:`, err);
            throw err;
        }
    }
    async findAtivoByEstoqueId(estoque_id) {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE estoque_id = ? AND data_entrega IS NULL";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [estoque_id]);
            if (resultado.length === 0) {
                throw new Error(`Nenhum empréstimo ativo encontrado para o exemplar de ID ${estoque_id}.`);
            }
            console.log(`Empréstimo ativo para o exemplar ID ${estoque_id} localizado com sucesso.`);
            return new Promise(resolve => resolve(resultado[0]));
        }
        catch (err) {
            console.error(`Falha ao procurar empréstimo ativo para o exemplar ID ${estoque_id}:`, err);
            throw err;
        }
    }
    async findSuspencoesAtivasPorUsuario(usuario_id) {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE usuario_id = ? AND suspensao_ate >= CURDATE()";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, [usuario_id]);
            return new Promise(resolve => resolve(resultado));
        }
        catch (err) {
            console.error(`Falha ao buscar suspensões ativas para o usuário ID ${usuario_id}:`, err);
            throw err;
        }
    }
    async findEmprestimosAtrasados() {
        const query = "SELECT * FROM biblioteca.Emprestimo WHERE data_devolucao < CURDATE() AND data_entrega IS NULL";
        try {
            const resultado = await (0, mysql_1.executarComandoSQL)(query, []);
            return new Promise(resolve => resolve(resultado));
        }
        catch (err) {
            console.error(`Falha ao buscar empréstimos atrasados:`, err);
            throw err;
        }
    }
}
exports.EmprestimoRepository = EmprestimoRepository;
