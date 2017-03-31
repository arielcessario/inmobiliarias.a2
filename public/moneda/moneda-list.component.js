"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
// Snapshot version
// #docregion
var core_1 = require("@angular/core");
var moneda_model_1 = require("./moneda.model");
// import { Hero, HeroService } from './hero.service';
var MonedaLisComponent = (function () {
    // @Output() ret = new EventEmitter<any>();
    function MonedaLisComponent() {
        // console.log(this.monedas.items);
    }
    MonedaLisComponent.prototype.ngOnInit = function () {
        // this.monedas = new Moneda();
    };
    return MonedaLisComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", moneda_model_1.Moneda)
], MonedaLisComponent.prototype, "monedas", void 0);
MonedaLisComponent = __decorate([
    core_1.Component({
        selector: 'moneda-list-component',
        templateUrl: 'app/moneda/moneda-list.component.html'
    }),
    __metadata("design:paramtypes", [])
], MonedaLisComponent);
exports.MonedaLisComponent = MonedaLisComponent;
//# sourceMappingURL=moneda-list.component.js.map