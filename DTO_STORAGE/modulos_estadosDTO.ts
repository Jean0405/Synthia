import { Expose, Transform } from 'class-transformer';

export class ModulosEstados {
  @Expose({ name: "modStatus_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  modStatus_id: number;

  @Expose({ name: "user_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  user_id: number;

  @Expose({ name: "id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id: number;

  @Expose({ name: "id_estado" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_estado: number;

  @Expose({ name: "id_modulo" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_modulo: number;


  constructor(
    id: number = 0,
    id_estado: number = 0,
    id_modulo: number = 0,
    user_id: number = 0,
    modStatus_id: number = 0
  ) {
    this.id = id;
    this.id_estado = id_estado;
    this.id_modulo = id_modulo;
    this.user_id = user_id;
    this.modStatus_id = modStatus_id;
  }
}