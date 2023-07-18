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
export class Usuario {
    constructor(id = 0, nombre = "", email = "", contrasena = "", id_rol = 0) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.contrasena = contrasena;
        this.id_rol = id_rol;
    }
}
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "id", void 0);
__decorate([
    Expose({ name: "nombre" }),
    Transform(({ value }) => { if (/^[a-z A-Z]+$/.test(value))
        return value;
    else
        throw { status: 400, message: `Error, el dato nombre no es valido` }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuario.prototype, "nombre", void 0);
__decorate([
    Expose({ name: "email" }),
    Transform(({ value }) => { if (/\S+@\S+\.\S+/.test(value))
        return value;
    else
        throw { status: 400, message: 'Error, el dato email no es válido' }; }, { toClassOnly: true }),
    __metadata("design:type", String)
], Usuario.prototype, "email", void 0);
__decorate([
    Expose({ name: "contrasena" }),
    Type(() => String),
    __metadata("design:type", String)
], Usuario.prototype, "contrasena", void 0);
__decorate([
    Expose({ name: "id_rol" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], Usuario.prototype, "id_rol", void 0);
