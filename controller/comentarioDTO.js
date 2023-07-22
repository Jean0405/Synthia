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
export class Comentario {
    constructor(id = 0, user_id = 0, mod_id = 0, contenido = "", fecha_creacion = "", id_usuario = 0, id_modulo = 0) {
        this.id = id;
        this.user_id = user_id;
        this.mod_id = mod_id;
        this.contenido = contenido;
        this.fecha_creacion = fecha_creacion;
        this.id_usuario = id_usuario;
        this.id_modulo = id_modulo;
    }
}
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Comentario.prototype, "id", void 0);
__decorate([
    Expose({ name: "user_id" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Comentario.prototype, "user_id", void 0);
__decorate([
    Expose({ name: "mod_id" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Comentario.prototype, "mod_id", void 0);
__decorate([
    Expose({ name: "contenido" }),
    Type(() => String),
    MaxLength(255, { message: "The comment is too long" }),
    __metadata("design:type", String)
], Comentario.prototype, "contenido", void 0);
__decorate([
    Expose({ name: "fecha_creacion" }),
    Transform(({ value }) => { if (/^[^]*$/.test(value)) {
        return value;
    }
    else {
        throw { status: 400, message: `Error, the date data is invalid.` };
    } }, { toClassOnly: true }),
    __metadata("design:type", String)
], Comentario.prototype, "fecha_creacion", void 0);
__decorate([
    Expose({ name: "id_usuario" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Comentario.prototype, "id_usuario", void 0);
__decorate([
    Expose({ name: "id_modulo" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Comentario.prototype, "id_modulo", void 0);
