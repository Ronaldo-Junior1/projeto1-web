import { EmprestimoService } from "../service/EmprestimoService";
import { UsuarioService } from "../service/UsuarioService";

export function verificaAtrasoEReativa() {
    const emprestimoService = new EmprestimoService();
    const usuarioService = new UsuarioService();
    const intervaloDeVerificacao = 10 * 1000; 

    console.log(`ROTINA: Verificação de atrasos e suspensões iniciada. Executando a cada ${intervaloDeVerificacao / 1000} segundos.`);

    setInterval(async () => {
        try {
            console.log('ROTINA: Rodando verificação de atrasos...');
            await emprestimoService.verificaAtrasos();
            
            console.log('ROTINA: Rodando verificação de usuários suspensos para reativar...');
            await usuarioService.reativarUsuarios();
        } catch (error) {
            console.error("ERRO DURANTE A EXECUÇÃO DA ROTINA:", error);
        }
    }, intervaloDeVerificacao);
}