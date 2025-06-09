"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivroRepository = void 0;
class LivroRepository {
    static instance;
    livros = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new LivroRepository();
        }
        return this.instance;
    }
    insereLivro(livro) {
        this.livros.push(livro);
    }
    findAll() {
        return this.livros;
    }
    findByIsbn(isbn) {
        return this.livros.find(l => l.isbn === isbn);
    }
    findById(id) {
        return this.livros.find(e => e.id === id);
    }
    findByAutorEditoraEdicao(autor, editora, edicao) {
        return this.livros.find(l => l.autor === autor && l.editora === editora && l.edicao === edicao);
    }
    removeLivroPorIsbn(isbn) {
        const index = this.livros.findIndex(l => l.isbn === isbn);
        if (index !== -1) {
            this.livros.splice(index, 1);
        }
    }
}
exports.LivroRepository = LivroRepository;
