export class CategoriaLivroDto{
    nome: string;

    constructor(nome?: string){
        this.nome = nome || '';
    }
}