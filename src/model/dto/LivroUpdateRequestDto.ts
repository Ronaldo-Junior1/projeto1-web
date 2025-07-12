export class LivroUpdateRequestDto {
    titulo?: string;
    autor?: string;
    editora?: string;
    edicao?: string;
    categoria_id?: number;

    constructor(
        titulo?: string,
        autor?: string,
        editora?: string,
        edicao?: string,
        categoria_id?: number
    ) {
        this.titulo = titulo;
        this.autor = autor;
        this.editora = editora;
        this.edicao = edicao;
        this.categoria_id = categoria_id;
    }
}