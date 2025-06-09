import { LivroEntity } from "../model/LivroEntity";

export class LivroRepository {
  private static instance: LivroRepository;
  private livros: LivroEntity[] = [];

  private constructor() {}

  static getInstance(): LivroRepository {
    if (!this.instance) {
      this.instance = new LivroRepository();
    }
    return this.instance;
  }

  insereLivro(livro: LivroEntity) {
    this.livros.push(livro);
  }
  
  findAll(): LivroEntity[] {
    return this.livros;
  }

  findByIsbn(isbn: string): LivroEntity | undefined {
    return this.livros.find(l => l.isbn === isbn);
  }

  findById(id: number): LivroEntity | undefined {
      return this.livros.find(e => e.id === id);
    }

  findByAutorEditoraEdicao(autor: string, editora: string, edicao: string): LivroEntity | undefined {
    return this.livros.find(l => l.autor === autor && l.editora === editora && l.edicao === edicao);
  }

  removeLivroPorIsbn(isbn: string): void {
    const index = this.livros.findIndex(l => l.isbn === isbn);
    if (index !== -1) {
      this.livros.splice(index, 1);
    }
  }
}