export class EmprestimoRequestDto {
    cpf: string;
    codigo_exemplar: number;

    constructor(cpf?: string, codigo_exemplar?: number) {
        this.cpf = cpf || '';
        this.codigo_exemplar = codigo_exemplar || 0;
    }
}