import { EstoqueEntity } from "../model/EstoqueEntity";

export class EstoqueRepository {
  private static instance: EstoqueRepository;
  private estoque: EstoqueEntity[] = [];

  private constructor() {}

  static getInstance(): EstoqueRepository {
    if (!this.instance) {
      this.instance = new EstoqueRepository();
    }
    return this.instance;
  }

  insereEstoque(estoque: EstoqueEntity): void {
    this.estoque.push(estoque);
  }

  findAll(): EstoqueEntity[] {
    return this.estoque;
  }

  findById(id: number): EstoqueEntity | undefined {
    return this.estoque.find(e => e.id === id);
  }

  findAllByLivroId(livro_id: number): EstoqueEntity[] {
        return this.estoque.filter(e => e.livro_id === livro_id);
  }

  removeById(id: number): void {
    const index = this.estoque.findIndex(e => e.id === id);
    if (index !== -1) {
      this.estoque.splice(index, 1);
    }
  }
}