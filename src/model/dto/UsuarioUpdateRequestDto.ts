import { StatusUsuario } from "../enum/StatusUsuario";

export class UsuarioUpdateRequestDto {
    nome?: string;
    status?: StatusUsuario;
    categoria_id?: number;
    curso_id?: number;

    constructor(
        nome?: string,
        status?: StatusUsuario,
        categoria_id?: number,
        curso_id?: number
    ) {
        this.nome = nome;
        this.status = status;
        this.categoria_id = categoria_id;
        this.curso_id = curso_id;
    }
}