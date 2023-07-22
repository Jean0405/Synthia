var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Type, Transform } from "class-transformer";
import { MaxLength } from 'class-validator';
export class Modulo {
    constructor(id_proyecto = 0, nombre = "", descripcion = "") {
        this.id_proyecto = id_proyecto;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }
}
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => { if (/^[a-z A-Z 0-9 áéíóúÁÉÍÓÚ\s,.]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato nombre no es valido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Modulo.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "descripcion" }),
    Type(() => String),
    MaxLength(255, {
        message: 'La descripción es muy larga',
    }),
    __metadata("design:type", String)
], Modulo.prototype, "descripcion", void 0);
__decorate([
    Expose({ name: "id_proyecto" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Modulo.prototype, "id_proyecto", void 0);
