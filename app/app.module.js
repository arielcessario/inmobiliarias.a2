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
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var platform_browser_1 = require("@angular/platform-browser");
var angularfire2_1 = require("angularfire2");
var app_component_1 = require("./app.component");
var test_pipe_1 = require("./shared/test.pipe.ts");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
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
    }),
    __metadata("design:paramtypes", [])
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map