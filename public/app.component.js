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
var core_1 = require("@angular/core");
var angularfire2_1 = require("angularfire2");
var fire_provider_1 = require("./providers/fire.provider");
// import { FireCacheProvider } from './fire.provider';
var AppComponent = (function () {
    function AppComponent(af) {
        // Este llamado inicializa Firebase
        fire_provider_1.FireFactoryService.init(af);
        // this.direcciones = new Direccion('','','','');
        // this.propiedades = new Propiedad();
        // this.monedas = new Moneda();
        // this.direcciones.join(['propiedad']);
        // this.propiedades.load();
        // this.propiedad.get()(data => this.direcciones = data);
        // this.direccion.get()(data => {
        // 	this.direcciones = data;
        // 	this.propiedad.load('direccion', this.direcciones);
        // });
        // console.log(this);
        // this.direccion.numero = '11111';
        // console.log(this.direccion);
        // facDirecciones= FireFactoryService()<Direccion>;
        // console.log(this.facDirecciones);
        // this.refPropiedades = fp.cacheFactory('propiedad');
        // this.refPropiedades.subscribe(data => this.propiedades = data);
        // this.refDirecciones = fp.cacheFactory('direccion');
        // this.refDirecciones.subscribe(data => this.direcciones = data);
    }
    // monedas: Moneda;
    // refDirecciones: CacheFactory;
    // refPropiedades: CacheFactory;
    AppComponent.prototype.ngOnInit = function () {
        // console.log(this.direccion);
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: 'app/app.component.html'
        // providers: [FireFactoryService]
    }),
    __metadata("design:paramtypes", [angularfire2_1.AngularFire])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map