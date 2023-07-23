import { Expose, Transform } from 'class-transformer';


export class Estado {
  @Expose({ name: "status_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  status_id: number;

  @Expose({ name: "user_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  user_id: number;

  @Expose({ name: "id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id: number;

  @Expose({ name: "nombre" })
  @Transform(({ value }) => { if (/^[a-z A-Z]+$/.test(value)) return value; else throw { status: 400, message: `Error, el dato nombre no es valido` } }, { toClassOnly: true })
  nombre: string;

  constructor(
    user_id: number = 0,
    id: number = 0,
    nombre: string = ""
  ) {
    this.user_id = user_id;
    this.id = id;
    this.nombre = nombre;
  }
}