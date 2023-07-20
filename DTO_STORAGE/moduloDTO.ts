import { Expose, Type, Transform } from "class-transformer";
import { MaxLength } from 'class-validator';

export class Modulo {

  @Expose({ name: "nombre" })
  @Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚ\s,.]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato nombre no es valido` } }, { toClassOnly: true })
  nombre: string;


  @Expose({ name: "descripcion" })
  @Type(() => String)
  @MaxLength(100, {
    message: 'La descripción es muy larga',
  })
  descripcion: string;

  @Expose({ name: "id_proyecto" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_proyecto: number;

  constructor(
    id_proyecto: number = 0,
    nombre: string = "",
    descripcion: string = ""
  ) {
    this.id_proyecto = id_proyecto;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}
