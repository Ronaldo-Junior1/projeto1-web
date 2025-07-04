export class EstoqueEntity {
  id: number;
  livro_id: number;
  quantidade: number;
  quantidade_emprestada: number;
  disponivel: boolean;

  constructor(codigo_exemplar: number, livro_id: number) {
    this.id = codigo_exemplar;
    this.livro_id = livro_id;
    this.quantidade = 0;
    this.quantidade_emprestada = 0;
    this.disponivel = false;
  }

}