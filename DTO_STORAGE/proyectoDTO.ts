import { Expose, Type, Transform } from "class-transformer";
import { MaxLength } from 'class-validator';

export class Proyecto {
  @Expose({ name: "id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id: number;

  @Expose({ name: "nombre" })
  @Transform(({ value }) => { if (/^[a-z A-Z 0-9]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato nombre no es valido` } }, { toClassOnly: true })
  nombre: string;

  @Expose({ name: "descripcion" })
  @Type(() => String)
  @MaxLength(50, {
    message: 'La descripción es muy larga',
  })
  descripcion: string;

  @Expose({ name: "fecha_creacion" })
  @Transform(({ value }) => { if (/^[^]*$/.test(value)) { return value; } else { throw { status: 400, message: `Error, el dato fecha reporte no es válido` }; } }, { toClassOnly: true })
  fecha_creacion: String;

  constructor(
    id: number = 0,
    nombre: string = "",
    descripcion: string = "",
    fecha_creacion: string = ""
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.fecha_creacion = fecha_creacion;
  }
}
