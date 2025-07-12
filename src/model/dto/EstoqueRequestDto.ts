export class EstoqueRequestDto {
    isbn: string;
    codigo_exemplar: number;

    constructor(isbn?: string, codigo_exemplar?: number) {
        this.isbn = isbn || '';
        this.codigo_exemplar = codigo_exemplar || 0;
    }
}