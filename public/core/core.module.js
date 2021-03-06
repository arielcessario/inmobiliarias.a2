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
var shared_module_1 = require("../shared/shared.module");
var nav_component_1 = require("./nav.component");
var pagination_component_1 = require("./pagination.component");
var pagination_pipe_1 = require("./pagination.pipe");
var pagination_service_1 = require("./pagination.service");
var autocomplete_component_1 = require("./autocomplete.component");
var autocomplete_service_1 = require("./autocomplete.service");
var waiting_component_1 = require("./waiting.component");
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
            pagination_pipe_1.PaginationPipe,
            autocomplete_component_1.AutocompleteComponent,
            waiting_component_1.WaitingComponent
        ],
        exports: [
            nav_component_1.NavComponent,
            pagination_component_1.PaginationComponent,
            pagination_pipe_1.PaginationPipe,
            autocomplete_component_1.AutocompleteComponent,
            waiting_component_1.WaitingComponent
        ],
        providers: [
            pagination_service_1.PaginationService,
            autocomplete_service_1.AutocompleteService,
        ]
    })
], CoreModule);
exports.CoreModule = CoreModule;
//# sourceMappingURL=core.module.js.map