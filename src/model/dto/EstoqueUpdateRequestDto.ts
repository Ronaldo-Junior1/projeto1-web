export class EstoqueUpdateRequestDto {
    quantidade: number;

    constructor(quantidade?: number) {
        this.quantidade = quantidade || 0;
    }
}