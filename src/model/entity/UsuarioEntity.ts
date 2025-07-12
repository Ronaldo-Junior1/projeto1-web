import { StatusUsuario } from "../enum/StatusUsuario"

export class UsuarioEntity {
  id?: number
  nome: string
  cpf: string
  status: StatusUsuario
  categoria_id: number
  curso_id: number

   constructor(nome: string,cpf: string,status: StatusUsuario,categoria_id: number,curso_id: number,id?:number) {
    this.id = id
    this.nome = nome
    this.cpf = cpf
    this.status = status
    this.categoria_id = categoria_id
    this.curso_id = curso_id
  }
}
