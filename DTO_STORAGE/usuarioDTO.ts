import { Expose, Type, Transform } from "class-transformer";

export class Usuario {
  @Expose({ name: "id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id: number;

  @Expose({ name: "nombre" })
  @Transform(({ value }) => { if (/^[a-z A-Z]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato nombre no es valido` } }, { toClassOnly: true })
  nombre: string;

  @Expose({ name: "email" })
  @Transform(({ value }) => {if (/\S+@\S+\.\S+/.test(value)) return value; else throw { status: 400, message: 'Error, el dato email no es válido' };}, { toClassOnly: true })
  email: string;

  @Expose({ name: "contrasena" })
  @Type(() => String)
  contrasena: string;

  @Expose({ name: "id_rol" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_rol: number;

  constructor(
    id: number = 0,
    nombre: string = "",
    email: string = "",
    contrasena: string = "",
    id_rol: number = 0
  ) {
    this.id = id;
    this.nombre = nombre;
    this.email = email;
    this.contrasena = contrasena;
    this.id_rol = id_rol;
  }
}
