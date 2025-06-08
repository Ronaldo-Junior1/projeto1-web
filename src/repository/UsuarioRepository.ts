import { UsuarioEntity } from "../model/UsuarioEntity";

export class UsuarioRepository {
  private static instance: UsuarioRepository;
  private usuarioList: UsuarioEntity[] = [];

  private constructor() {}

  static getInstance(): UsuarioRepository {
    if (!this.instance) {
      this.instance = new UsuarioRepository();
    }
    return this.instance;
  }

  insereUsuario(usuario: UsuarioEntity) {
    this.usuarioList.push(usuario);
  }

  removeUsuarioPorCPF(cpf: string): void {
    const index = this.usuarioList.findIndex(u => u.cpf === cpf);

    if (index === -1) {
      throw new Error("Usuário com o CPF informado não foi encontrado para remoção!");
    }

    this.usuarioList.splice(index, 1);
  }

  findAll(): UsuarioEntity[] {
    return this.usuarioList;
  }

  findByCPF(cpf: string): UsuarioEntity | undefined {
    return this.usuarioList.find(u => u.cpf === cpf);
  }
}
