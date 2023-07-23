var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose, Transform } from 'class-transformer';
export class ProyectosEstados {
    constructor(id = 0, id_estado = 0, id_proyecto = 0, user_id = 0, project_id = 0) {
        this.id = id;
        this.id_estado = id_estado;
        this.id_proyecto = id_proyecto;
        this.user_id = user_id;
        this.project_id = project_id;
    }
}
__decorate([
    Expose({ name: "id" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], ProyectosEstados.prototype, "id", void 0);
__decorate([
    Expose({ name: "id_estado" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], ProyectosEstados.prototype, "id_estado", void 0);
__decorate([
    Expose({ name: "id_proyecto" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], ProyectosEstados.prototype, "id_proyecto", void 0);
__decorate([
    Expose({ name: "user_id" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], ProyectosEstados.prototype, "user_id", void 0);
__decorate([
    Expose({ name: "project_id" }),
    Transform(({ value }) => { if (Math.floor(value) && typeof value == "number")
        return Math.floor(value); }, { toClassOnly: true }),
    __metadata("design:type", Number)
], ProyectosEstados.prototype, "project_id", void 0);
