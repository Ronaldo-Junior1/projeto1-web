import { LivroEntity } from "../model/LivroEntity";
import { CategoriaLivroRepository } from "../repository/CategoriaLivroRepositoryt";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";
import { EstoqueRepository } from "../repository/EstoqueRepository";
import { LivroRepository } from "../repository/LivroRepository";


export class LivroService {
    private livroRepository = LivroRepository.getInstance();
    private categoriaRepository = CategoriaLivroRepository.getInstance();
    private estoqueRepository = EstoqueRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance();

    novoLivro(data: any): LivroEntity {
        const { titulo, isbn, autor, editora, edicao, categoria_id } = data;

        if (!titulo || !isbn || !autor || !editora || !edicao || !categoria_id) {
            throw new Error("Todos os campos são obrigatórios.");
        }

        if (this.livroRepository.findByAutorEditoraEdicao(autor, editora, edicao)) {
            throw new Error("Já existe um livro com o mesmo autor, editora e edição.");
        }

        if (this.livroRepository.findByIsbn(isbn)) {
            throw new Error("ISBN já cadastrado.");
        }

        if (!this.categoriaRepository.findById(Number(categoria_id))) {
            throw new Error("Categoria informada não existe.");
        }

        const novoLivro = new LivroEntity(titulo, autor, editora, edicao, isbn, Number(categoria_id));
        this.livroRepository.insereLivro(novoLivro);
        return novoLivro;
    }

    listarLivros(): LivroEntity[] {
        return this.livroRepository.findAll();
    }

    buscarLivroPorIsbn(isbn: string): LivroEntity {
        const livro = this.livroRepository.findByIsbn(isbn);
        if (!livro) {
            throw new Error("Livro não encontrado.");
        }
        return livro;
    }

    atualizarLivro(isbn: string, dadosAtualizados: any): LivroEntity {
        const livro = this.buscarLivroPorIsbn(isbn);

        if(dadosAtualizados.titulo) livro.titulo = dadosAtualizados.titulo;
        if(dadosAtualizados.autor) livro.autor = dadosAtualizados.autor;
        if(dadosAtualizados.editora) livro.editora = dadosAtualizados.editora;
        if(dadosAtualizados.edicao) livro.edicao = dadosAtualizados.edicao;
        if(dadosAtualizados.categoria_id) {
            if (!this.categoriaRepository.findById(Number(dadosAtualizados.categoria_id))) {
                throw new Error("Nova categoria informada não existe.");
            }
            livro.categoria_id = Number(dadosAtualizados.categoria_id);
        }
        
        return livro;
    }

     removerLivro(isbn: string): void {
        const livro = this.buscarLivroPorIsbn(isbn);

        const todosOsExemplares = this.estoqueRepository.findAllByLivroId(livro.id);

        for (const exemplar of todosOsExemplares) {
            const emprestimoAtivo = this.emprestimoRepository.findAtivoByEstoqueId(exemplar.id);
            if (emprestimoAtivo) {
                throw new Error(`Livro não pode ser removido. O exemplar de código ${exemplar.id} está emprestado.`);
            }
        }
        
        this.livroRepository.removeLivroPorIsbn(isbn);
        for (const exemplar of todosOsExemplares) {
            this.estoqueRepository.removeById(exemplar.id);
        }
    }
}