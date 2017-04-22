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
var router_1 = require("@angular/router");
// import { Hero, HeroService } from './hero.service';
var NavComponent = (function () {
    function NavComponent(router) {
        var _this = this;
        this.router = router;
        this.titulo = '';
        this.routes = ['monedas', 'propiedades', 'comodidades', 'servicios', 'principal'];
        this.router.events.subscribe(function (data) {
            _this.titulo = data['url'].replace('/', '');
        });
    }
    NavComponent.prototype.isSelected = function (path) {
        // if(path === this.location.path()){
        //     return true;
        // }
        // else if(path.length > 0){
        //     return this.location.path().indexOf(path) > -1;
        // }
    };
    NavComponent.prototype.gotoDetail = function (link) {
        // console.log('entra');
        // let link = ['/detail', hero.id];
        this.router.navigate([link]);
    };
    NavComponent.prototype.ngOnInit = function () {
        // (+) converts string 'id' to a number
        // let id = +this.route.snapshot.params['id'];
        // this.service.getHero(id)
        //     .then((hero: Hero) => this.hero = hero);
    };
    return NavComponent;
}());
NavComponent = __decorate([
    core_1.Component({
        selector: 'nav-component',
        templateUrl: 'app/core/nav.component.html'
    }),
    __metadata("design:paramtypes", [router_1.Router])
], NavComponent);
exports.NavComponent = NavComponent;
//# sourceMappingURL=nav.component.js.map