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
var MonedaComponent = (function () {
    function MonedaComponent() {
        this.monedas = new moneda_model_1.Moneda();
        console.log(this.monedas.itemsObs.subscribe(function (data) { return console.log(data); }));
    }
    // #docregion snapshot
    MonedaComponent.prototype.ngOnInit = function () {
        this.formMonedas = this.monedas.buildForm(this.formMonedas);
        // (+) converts string 'id' to a number
        // let id = +this.route.snapshot.params['id'];
        // this.service.getHero(id)
        //     .then((hero: Hero) => this.hero = hero);
    };
    // #enddocregion snapshot
    MonedaComponent.prototype.gotoHeroes = function () {
        // this.router.navigate(['/heroes']);
    };
    return MonedaComponent;
}());
MonedaComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/moneda/moneda.component.html'
    }),
    __metadata("design:paramtypes", [])
], MonedaComponent);
exports.MonedaComponent = MonedaComponent;
//# sourceMappingURL=moneda.component.js.map