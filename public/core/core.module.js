"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// #docplaster
// #docregion
// #docregion v1
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var nav_component_1 = require("./nav.component");
// import { MonedaRoutingModule }    from './moneda-routes.module';
// import { HeroListComponent }    from './hero-list.component';
// import { HeroDetailComponent }  from './hero-detail.component';
//
// import { HeroService } from './hero.service';
// #enddocregion v1
// import { HeroRoutingModule } from './heroes-routing.module';
// #docregion v1
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.ReactiveFormsModule,
        ],
        declarations: [
            nav_component_1.NavComponent,
        ],
        exports: [nav_component_1.NavComponent],
        providers: []
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map