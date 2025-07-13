import { LivroEntity } from "../model/entity/LivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";


export class LivroService {
    private livroRepository = LivroRepository.getInstance();
    private categoriaRepository = CategoriaLivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    async novoLivro(data: any): Promise<LivroEntity> {
        const { titulo, isbn, autor, editora, edicao, categoria_id } = data;

        if (!titulo || !isbn || !autor || !editora || !edicao || !categoria_id) {
            throw new Error("Todos os campos são obrigatórios.");
        }
        try {
            await this.livroRepository.findByIsbn(isbn);
            throw new Error("ISBN já cadastrado.");
        } catch (error: any) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }
        
        try {
            await this.livroRepository.findByAutorEditoraEdicao(autor, editora, edicao);
            throw new Error("Já existe um livro com o mesmo autor, editora e edição.");
        } catch (error: any) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }

        await this.categoriaRepository.findById(categoria_id);
        const novoLivro = new LivroEntity(titulo, autor, editora, edicao, isbn, categoria_id);
        await this.livroRepository.insereLivro(novoLivro);
    
        return novoLivro;
    }

    async listarLivros(): Promise<LivroEntity[]> {
        return await this.livroRepository.findAll();
    }

    async buscarLivroPorIsbn(isbn: string): Promise<LivroEntity> {
        return await this.livroRepository.findByIsbn(isbn);
    }

    async atualizarLivro(isbn: string, dadosAtualizados: any): Promise<LivroEntity> {
        const livro = await this.buscarLivroPorIsbn(isbn);

        livro.titulo = dadosAtualizados.titulo ?? livro.titulo;
        livro.autor = dadosAtualizados.autor ?? livro.autor;
        livro.editora = dadosAtualizados.editora ?? livro.editora;
        livro.edicao = dadosAtualizados.edicao ?? livro.edicao;

        if (dadosAtualizados.categoria_id) {
            await this.categoriaRepository.findById(dadosAtualizados.categoria_id);
            livro.categoria_id = dadosAtualizados.categoria_id;
        }
        
        return await this.livroRepository.updateLivroPorIsbn(livro);
    }

    async removerLivro(isbn: string): Promise<void> {
        const livro = await this.buscarLivroPorIsbn(isbn);

        const todosOsExemplares = await this.estoqueRepository.findAllByLivroId(Number(livro.id));
        
        for (const exemplar of todosOsExemplares) {
            try{
                const emprestimoAtivo = await this.emprestimoRepository.findAtivoByEstoqueId(exemplar.id);
                if (emprestimoAtivo) {
                throw new Error(`Livro não pode ser removido. O exemplar de código ${exemplar.id} está emprestado.`);
                }
            }catch(error: any){
                if (error.message.includes("Nenhum empréstimo ativo encontrado")) {
                continue; 
                }
                throw error;
            }
            
        }
        await this.livroRepository.removeLivroPorIsbn(isbn);
        
        for (const exemplar of todosOsExemplares) {
            await this.estoqueRepository.removeById(exemplar.id);
        }

        console.log(`Livro com ISBN ${isbn} e todos os seus exemplares foram removidos com sucesso.`);
    }
}