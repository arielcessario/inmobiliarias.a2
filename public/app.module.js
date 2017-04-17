"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var animations_1 = require("@angular/platform-browser/animations");
var angularfire2_1 = require("angularfire2");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var core_module_1 = require("./core/core.module");
var moneda_module_1 = require("./moneda/moneda.module");
var propiedad_module_1 = require("./propiedad/propiedad.module");
var general_module_1 = require("./general/general.module");
var otro_module_1 = require("./otro/otro.module");
var shared_module_1 = require("./shared/shared.module");
var pagination_service_1 = require("./core/pagination.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            router_1.RouterModule,
            animations_1.BrowserAnimationsModule,
            forms_1.ReactiveFormsModule,
            app_routes_1.Routing,
            moneda_module_1.MonedasModule,
            propiedad_module_1.PropiedadesModule,
            general_module_1.GeneralesModule,
            otro_module_1.OtrosModule,
            shared_module_1.SharedModule,
            core_module_1.CoreModule,
            angularfire2_1.AngularFireModule.initializeApp({
                apiKey: "AIzaSyAbx0mKlgtt4k7qRxTgcmvbJyHD6GjOFDU",
                authDomain: "inmobiliarias.firebaseapp.com",
                databaseURL: "https://inmobiliarias.firebaseio.com",
                storageBucket: "firebase-inmobiliarias.appspot.com"
            }, {
                provider: angularfire2_1.AuthProviders.Facebook,
                method: angularfire2_1.AuthMethods.Redirect
            }),
        ],
        declarations: [app_component_1.AppComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [pagination_service_1.PaginationService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map