export class CategoriaUsuarioDto{
    nome: string;

    constructor(nome?: string){
        this.nome = nome || '';
    }
}