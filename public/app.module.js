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
var angularfire2_1 = require("angularfire2");
var app_routes_1 = require("./app.routes");
var app_component_1 = require("./app.component");
var core_module_1 = require("./core/core.module");
var moneda_module_1 = require("./moneda/moneda.module");
var test_pipe_1 = require("./shared/test.pipe");
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
            forms_1.ReactiveFormsModule,
            app_routes_1.Routing,
            core_module_1.CoreModule,
            moneda_module_1.MonedasModule,
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
        declarations: [app_component_1.AppComponent, test_pipe_1.testPipe],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map