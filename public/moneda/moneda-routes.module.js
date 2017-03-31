"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var moneda_component_1 = require("./moneda.component");
// import { HeroesComponent } from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';
var routes = [
    // {
    //     path: '',
    //     redirectTo: '/moneda',
    //     pathMatch: 'full'
    // },
    {
        path: 'moneda',
        component: moneda_component_1.MonedaComponent
    },
];
var MonedaRoutingModule = (function () {
    function MonedaRoutingModule() {
    }
    return MonedaRoutingModule;
}());
MonedaRoutingModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forRoot(routes)],
        exports: [router_1.RouterModule]
    })
], MonedaRoutingModule);
exports.MonedaRoutingModule = MonedaRoutingModule;
exports.routedComponents = [moneda_component_1.MonedaComponent];
//# sourceMappingURL=moneda-routes.module.js.map