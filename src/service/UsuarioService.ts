import { StatusUsuario } from "../model/enum/StatusUsuario";
import { UsuarioEntity } from "../model/entity/UsuarioEntity";
import { UsuarioRepository } from "../repository/UsuarioRepository";
import { CategoriaUsuarioRepository } from "../repository/CategoriaUsuarioRepository";
import { CursoRepository } from "../repository/CursoRepository";
import { EmprestimoRepository } from "../repository/EmprestimoRepository";

export class UsuarioService {
    private usuarioRepository = UsuarioRepository.getInstance();
    private categoriaRepository = CategoriaUsuarioRepository.getInstance();
    private cursoRepository = CursoRepository.getInstance();
    private emprestimoRepository = EmprestimoRepository.getInstance(); 

    async novoUsuario(data: any): Promise<UsuarioEntity> {
        const { nome, cpf, categoria_id, curso_id } = data;

        if (!nome || !cpf || !categoria_id || !curso_id) {
            throw new Error("Favor informar todos os campos obrigatórios.");
        }

        if (!this.validarCPF(cpf)) {
            throw new Error("CPF inválido.");
        }

        try {
            await this.usuarioRepository.filterUsuarioByCpf(cpf);
            throw new Error("CPF já cadastrado.");
        } catch (error: any) {
            if (!error.message.includes("não encontrado")) {
                throw error;
            }
        }
        
        await this.categoriaRepository.findById(categoria_id);
        await this.cursoRepository.findById(curso_id);
        
        const usuario = new UsuarioEntity(nome, cpf, StatusUsuario.ATIVO, categoria_id, curso_id);
        
        const novoUsuario = await this.usuarioRepository.insertUsuario(usuario);
        console.log("Service - Usuário inserido:", novoUsuario);
        return novoUsuario;
    }

    async listarUsuarios(): Promise<UsuarioEntity[]> {
        const usuarios = await this.usuarioRepository.filterAllUsuario();
        console.log("Service - Listar todos os usuários:", usuarios);
        return usuarios;
    }
    
    async buscarUsuarioPorCPF(cpf: string): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        console.log("Service - Buscar usuário por CPF:", usuario);
        return usuario;
    }

    async atualizarUsuario(cpf: string, dadosAtualizados: any): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.filterUsuarioByCpf(cpf);

        usuario.nome = dadosAtualizados.nome ?? usuario.nome;
        usuario.status = dadosAtualizados.status ?? usuario.status;

        if (dadosAtualizados.categoria_id) {
            await this.categoriaRepository.findById(dadosAtualizados.categoria_id);
            usuario.categoria_id = dadosAtualizados.categoria_id;
        }
        if (dadosAtualizados.curso_id) {
            await this.cursoRepository.findById(dadosAtualizados.curso_id);
            usuario.curso_id = dadosAtualizados.curso_id;
        }
        
        await this.usuarioRepository.updateUsuario(usuario);
        console.log("Service - Usuário atualizado:", usuario);
        return usuario;
    }

    async removerUsuario(cpf: string): Promise<void> {
        const usuarioExistente = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        const emprestimosAtivos = await this.emprestimoRepository.findAtivosByUsuarioId(usuarioExistente.id!);
        
        if (emprestimosAtivos.length > 0) {
            throw new Error("Usuário não pode ser removido pois possui empréstimos ativos.");
        }

        await this.usuarioRepository.deleteUsuario(usuarioExistente.id!);
        console.log("Service - Usuário removido com CPF:", cpf);
    }
    
    async alterarStatus(cpf: string, novoStatus: StatusUsuario): Promise<UsuarioEntity> {
        const usuario = await this.usuarioRepository.filterUsuarioByCpf(cpf);
        usuario.status = novoStatus;
        await this.usuarioRepository.updateUsuario(usuario);
        console.log(`Service - Status do usuário ${cpf} alterado para ${novoStatus}`);
        return usuario;
    }

    async reativarUsuarios(): Promise<void> {
        console.log("SERVICE: Verificando usuários para reativar...");
        const usuariosSuspensos = await this.usuarioRepository.findUsuariosPorStatus([StatusUsuario.SUSPENSO]);
        
        for (const usuario of usuariosSuspensos) {
            const suspensoesAtivas = await this.emprestimoRepository.findSuspencoesAtivasPorUsuario(usuario.id!);
            
            if (suspensoesAtivas.length === 0) {
                console.log(`Reativando usuário ${usuario.nome} (ID: ${usuario.id})`);
                await this.alterarStatus(usuario.cpf, StatusUsuario.ATIVO);
            }
        }
    }
    

    private validarCPF(cpf: string): boolean {
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
            return false;
        }
        const digitos = cpf.split('').map(Number);
        const calcularDigito = (parteCpf: number[]): number => {
            const soma = parteCpf.reduce((acc, digito, index) => {
                const peso = parteCpf.length + 1 - index;
                return acc + (digito * peso);
            }, 0);
            const resto = soma % 11;
            return resto < 2 ? 0 : 11 - resto;
        };
        const primeirosNove = digitos.slice(0, 9);
        if (calcularDigito(primeirosNove) !== digitos[9]) {
            return false;
        }
        const primeirosDez = digitos.slice(0, 10);
        if (calcularDigito(primeirosDez) !== digitos[10]) {
            return false;
        }
        return true;
    }
}