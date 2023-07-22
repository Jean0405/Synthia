import { Expose, Type, Transform } from "class-transformer";
import { MaxLength } from 'class-validator';

export class Comentario {

  @Expose({ name: "id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id: number;

  @Expose({ name: "user_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  user_id: number;


  @Expose({ name: "mod_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  mod_id: number;

  @Expose({ name: "contenido" })
  @Type(() => String)
  @MaxLength(255, { message: "The comment is too long" })
  contenido: string;

  @Expose({ name: "fecha_creacion" })
  @Transform(({ value }) => { if (/^[^]*$/.test(value)) { return value; } else { throw { status: 400, message: `Error, the date data is invalid.` }; } }, { toClassOnly: true })
  fecha_creacion: String;

  @Expose({ name: "id_usuario" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_usuario: number;

  @Expose({ name: "id_modulo" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_modulo: number;

  constructor(
    id: number = 0,
    user_id: number = 0,
    mod_id: number = 0,
    contenido: string = "",
    fecha_creacion: string = "",
    id_usuario: number = 0,
    id_modulo: number = 0
  ) {
    this.id = id;
    this.user_id = user_id;
    this.mod_id = mod_id;
    this.contenido = contenido;
    this.fecha_creacion = fecha_creacion;
    this.id_usuario = id_usuario;
    this.id_modulo = id_modulo;
  }
}
