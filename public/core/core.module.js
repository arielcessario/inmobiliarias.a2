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
var pagination_component_1 = require("./pagination.component");
var pagination_pipe_1 = require("./pagination.pipe");
var pagination_service_1 = require("./pagination.service");
var shared_module_1 = require("../shared/shared.module");
var CoreModule = (function () {
    function CoreModule() {
    }
    return CoreModule;
}());
CoreModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            shared_module_1.SharedModule,
            forms_1.ReactiveFormsModule,
        ],
        declarations: [
            nav_component_1.NavComponent,
            pagination_component_1.PaginationComponent,
            pagination_pipe_1.PaginationPipe
        ],
        exports: [
            nav_component_1.NavComponent,
            pagination_component_1.PaginationComponent,
            pagination_pipe_1.PaginationPipe
        ],
        providers: [
            pagination_service_1.PaginationService
        ]
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map