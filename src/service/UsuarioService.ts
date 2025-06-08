import { UsuarioEntity } from "../model/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";

export class UsuarioService {
  private usuarioRepository = UsuarioRepository.getInstance();
  private categoriaRepository = CategoriaUsuarioRepository.getInstance();
  private cursoRepository = CursoRepository.getInstance();

  novoUsuario(data: any): UsuarioEntity {
    const { nome, cpf, categoria_id, curso_id } = data;

    if (!nome || !cpf || !categoria_id || !curso_id) {
      throw new Error("Favor informar todos os campos.");
    }

    if (!this.validarCPF(cpf)) {
      throw new Error("CPF inválido.");
    }

    if (this.usuarioRepository.findByCPF(cpf)) {
      throw new Error("CPF já cadastrado.");
    }

    const categoria = this.categoriaRepository.findById(Number(categoria_id));
    const curso = this.cursoRepository.findById(Number(curso_id));

    if (!categoria) {
      throw new Error("Categoria informada não existe.");
    }

    if (!curso) {
      throw new Error("Curso informado não existe.");
    }

    const usuario = new UsuarioEntity(nome,cpf,true,categoria_id,curso_id);

    this.usuarioRepository.insereUsuario(usuario);
    return usuario;
  }

  listarUsuarios(): UsuarioEntity[] {
    return this.usuarioRepository.findAll();
  }

  removeUsuario(cpf: string):void {
     const usuarioExistente = this.usuarioRepository.findByCPF(cpf);
    if (!usuarioExistente) {
      throw new Error("Usuário não encontrado.");
    }
    
    this.usuarioRepository.removeUsuarioPorCPF(cpf);
  }
  buscarUsuarioPorCPF(cpf: string): UsuarioEntity | undefined{
    return this.usuarioRepository.findByCPF(cpf);
  }

  atualizarUsuario(cpf: string, dadosAtualizados: any): UsuarioEntity {
    const usuario = this.buscarUsuarioPorCPF(cpf);

    if (!usuario) {
      throw new Error("Usuário não encontrado.");
    }

    if (dadosAtualizados.nome) {
      usuario.nome = dadosAtualizados.nome;
    }
    if (dadosAtualizados.categoria_id) {
      const categoria = this.categoriaRepository.findById(Number(dadosAtualizados.categoria_id));
      if (!categoria) throw new Error("Nova categoria informada não existe.");
      usuario.categoria_id = Number(dadosAtualizados.categoria_id);
    }
    if (dadosAtualizados.curso_id) {
      const curso = this.cursoRepository.findById(Number(dadosAtualizados.curso_id));
      if (!curso) throw new Error("Novo curso informado não existe.");
      usuario.curso_id = Number(dadosAtualizados.curso_id);
    }
    return usuario;
  }

   private validarCPF(cpf: string): boolean {
    // 1. Verifica se o CPF tem 11 dígitos  e não é uma sequência repetida.
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const digitos = cpf.split('').map(Number);

    // Função para calcular um dígito verificador.
    const calcularDigito = (parteCpf: number[]): number => {
      // Atribui pesos e soma os resultados.
      const soma = parteCpf.reduce((acc, digito, index) => {
        const peso = parteCpf.length + 1 - index;
        return acc + (digito * peso);
      }, 0);
      
      // Calcula o resto da divisão por 11.
      const resto = soma % 11;

      // Se o resto for < 2, o dígito é 0; senão, é 11 - resto.
      return resto < 2 ? 0 : 11 - resto;
    };

    // --- Validação do primeiro dígito verificador (10º dígito) ---
    const primeirosNove = digitos.slice(0, 9);
    if (calcularDigito(primeirosNove) !== digitos[9]) {
      return false; // Falha na validação do primeiro dígito.
    }

    // --- Validação do segundo dígito verificador (11º dígito) ---
    const primeirosDez = digitos.slice(0, 10);
    if (calcularDigito(primeirosDez) !== digitos[10]) {
      return false; // Falha na validação do segundo dígito.
    }

    return true; // CPF é válido.
  }

}
