import { Expose, Transform } from "class-transformer";

export class ModulosUsuarios{
  @Expose({ name: "user_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  user_id: number;

  @Expose({ name: "id_usuario" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_usuario: number;

  @Expose({ name: "id_modulo" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_modulo:number;

  constructor(
    user_id:number = 0,
    id_usuario:number = 0,
    id_modulo:number = 0
    ) {
    this.user_id = user_id;
    this.id_usuario = id_usuario;
    this.id_modulo = id_modulo;
  }
}