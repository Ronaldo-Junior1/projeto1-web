"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstoqueRepository = void 0;
class EstoqueRepository {
    static instance;
    estoque = [];
    constructor() { }
    static getInstance() {
        if (!this.instance) {
            this.instance = new EstoqueRepository();
        }
        return this.instance;
    }
    insereEstoque(estoque) {
        this.estoque.push(estoque);
    }
    findAll() {
        return this.estoque;
    }
    findById(id) {
        return this.estoque.find(e => e.id === id);
    }
    removeById(id) {
        const index = this.estoque.findIndex(e => e.id === id);
        if (index !== -1) {
            this.estoque.splice(index, 1);
        }
    }
}
exports.EstoqueRepository = EstoqueRepository;
