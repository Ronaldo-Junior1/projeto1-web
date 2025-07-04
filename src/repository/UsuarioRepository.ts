import { UsuarioEntity } from "../model/entity/UsuarioEntity";

export class UsuarioRepository {
  private static instance: UsuarioRepository;
  private usuarios: UsuarioEntity[] = [];

  private constructor() {}

  static getInstance(): UsuarioRepository {
    if (!this.instance) {
      this.instance = new UsuarioRepository();
    }
    return this.instance;
  }

  insereUsuario(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  removeUsuarioPorCPF(cpf: string): void {
    const index = this.usuarios.findIndex(u => u.cpf === cpf);

    if (index === -1) {
      throw new Error("Usuário com o CPF informado não foi encontrado para remoção!");
    }

    this.usuarios.splice(index, 1);
  }

  findAll(): UsuarioEntity[] {
    return this.usuarios;
  }

  findByCPF(cpf: string): UsuarioEntity | undefined {
    return this.usuarios.find(u => u.cpf === cpf);
  }

  findById(id: number): UsuarioEntity | undefined {
        return this.usuarios.find(e => e.id === id);
      }
  
}
