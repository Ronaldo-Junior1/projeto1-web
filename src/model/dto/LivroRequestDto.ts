export class LivroRequestDto {
    titulo: string;
    isbn: string;
    autor: string;
    editora: string;
    edicao: string;
    categoria_id: number;

    constructor(
        titulo?: string,
        isbn?: string,
        autor?: string,
        editora?: string,
        edicao?: string,
        categoria_id?: number
    ) {
        this.titulo = titulo || '';
        this.isbn = isbn || '';
        this.autor = autor || '';
        this.editora = editora || '';
        this.edicao = edicao || '';
        this.categoria_id = categoria_id || 0;
    }
}