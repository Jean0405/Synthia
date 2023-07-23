import { Expose, Transform } from 'class-transformer';

export class ProyectosEstados {
  @Expose({ name: "id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id: number;

  @Expose({ name: "id_estado" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_estado: number;

  @Expose({ name: "id_proyecto" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  id_proyecto: number;

  @Expose({ name: "user_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  user_id: number;

  @Expose({ name: "project_id" })
  @Transform(({ value }) => { if (Math.floor(value) && typeof value == "number") return Math.floor(value) }, { toClassOnly: true })
  project_id: number;

  constructor(
    id: number = 0,
    id_estado: number = 0,
    id_proyecto: number = 0,
    user_id: number = 0,
    project_id: number = 0
  ) {
    this.id = id;
    this.id_estado = id_estado;
    this.id_proyecto = id_proyecto;
    this.user_id = user_id;
    this.project_id = project_id;
  }
}