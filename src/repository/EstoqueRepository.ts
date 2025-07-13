import { executarComandoSQL } from "../database/mysql";
import { EstoqueEntity } from "../model/entity/EstoqueEntity";

export class EstoqueRepository {
    private static instance: EstoqueRepository;

    private constructor() {
        this.createTable();
    }

    public static getInstance(): EstoqueRepository {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Estoque (
            id INT PRIMARY KEY,
            livro_id INT NOT NULL,
            quantidade INT NOT NULL DEFAULT 0,
            quantidade_emprestada INT NOT NULL DEFAULT 0,
            disponivel BOOLEAN NOT NULL DEFAULT FALSE
        )`;
        try {
            await executarComandoSQL(query, []);
            console.log('Tabela Estoque verificada/criada com sucesso.');
        } catch (err) {
            console.error('Erro ao criar a tabela Estoque:', err);
        }
    }
    
    async insereEstoque(estoque: EstoqueEntity): Promise<EstoqueEntity> {
        const query = "INSERT INTO biblioteca.Estoque (id, livro_id, quantidade, quantidade_emprestada, disponivel) VALUES (?, ?, ?, ?, ?)";
        const params = [estoque.id, estoque.livro_id, estoque.quantidade, estoque.quantidade_emprestada, estoque.disponivel];
        try {
            await executarComandoSQL(query, params);
            console.log('Registro de estoque inserido com sucesso, ID:', estoque.id);
            return new Promise(resolve => resolve(estoque));
        } catch (err) {
            console.error('Erro ao inserir registro no estoque:', err);
            throw err;
        }
    }

    async updateEstoque(estoque: EstoqueEntity): Promise<EstoqueEntity> {
        const query = `
            UPDATE biblioteca.Estoque 
            SET quantidade = ?, quantidade_emprestada = ?, disponivel = ?
            WHERE id = ?`;
        const params = [estoque.quantidade, estoque.quantidade_emprestada, estoque.disponivel, estoque.id];
        try {
            await executarComandoSQL(query, params);
            console.log(`Estoque do livro ID ${estoque.livro_id} atualizado com sucesso.`);
            return new Promise(resolve => resolve(estoque));
        } catch(err) {
            console.error(`Falha ao atualizar o estoque do livro ID ${estoque.livro_id}:`, err);
            throw err;
        }
    }
    
    async findById(id: number): Promise<EstoqueEntity> {
        const query = "SELECT * FROM biblioteca.Estoque WHERE id = ?";
        try {
            const resultado = await executarComandoSQL(query, [id]);
            if (resultado.length === 0) {
                throw new Error(`Registro de estoque com ID ${id} não encontrado.`);
            }
            resultado[0].disponivel = !!resultado[0].disponivel;
            console.log('Registro de estoque localizado com sucesso, ID:', id);
            return new Promise(resolve => resolve(resultado[0]));
        } catch (err) {
            console.error(`Falha ao procurar o registro de estoque de ID ${id}:`, err);
            throw err;
        }
    }

    async findAllByLivroId(livro_id: number): Promise<EstoqueEntity[]> {
        const query = "SELECT * FROM biblioteca.Estoque WHERE livro_id = ?";
        try {
            const resultado = await executarComandoSQL(query, [livro_id]);
            resultado.forEach((item: any) => item.disponivel = !!item.disponivel);
            console.log(`Registros de estoque para o livro ID ${livro_id} listados com sucesso.`);
            return new Promise(resolve => resolve(resultado));
        } catch (err) {
            console.error(`Falha ao listar o estoque para o livro ID ${livro_id}:`, err);
            throw err;
        }
    }
    
    async removeById(id: number): Promise<number> {
        const query = "DELETE FROM biblioteca.Estoque WHERE id = ?";
        try {
            await executarComandoSQL(query, [id]);
            console.log('Registro de estoque removido com sucesso, ID:', id);
            return new Promise(resolve => resolve(id));
        } catch (err) {
            console.error(`Falha ao remover o registro de estoque de ID ${id}:`, err);
            throw err;
        }
    }

     async findAllDisponiveis(): Promise<EstoqueEntity[]> {
        const query = "SELECT * FROM biblioteca.Estoque WHERE disponivel = TRUE";
        try {
            const resultado = await executarComandoSQL(query, []);
            resultado.forEach((item: any) => item.disponivel = !!item.disponivel);
            console.log('Exemplares disponíveis listados com sucesso.');
            return new Promise(resolve => resolve(resultado));
        } catch (err) {
            console.error('Falha ao listar exemplares disponíveis:', err);
            throw err;
        }
    }
}