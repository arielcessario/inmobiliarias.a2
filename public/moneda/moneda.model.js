"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fire_provider_1 = require("../providers/fire.provider");
var forms_1 = require("@angular/forms");
var Moneda = (function (_super) {
    __extends(Moneda, _super);
    function Moneda() {
        var _this = _super.call(this) || this;
        _this.submitted = false;
        _this.formErrors = {
            'nombre': '',
            'simbolo': '',
            'status': ''
        };
        _this.validationMessages = {
            'nombre': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.'
            },
            'simbolo': {
                'required': 'Power is required.',
                'maxlength': 'Sismbolo tiene que tener un máximo de 3 letras'
            },
            'status': {
                'required': 'Power is required.'
            }
        };
        return _this;
    }
    Moneda.prototype.buildForm = function (form) {
        var _this = this;
        this.fb = new forms_1.FormBuilder();
        this.form = form;
        this.form = this.fb.group({
            '$key': this.$key,
            '$exists': this.$exists,
            'propiedad': this.propiedad,
            'nombre': [this.nombre, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24),
                ]
            ],
            'simbolo': [this.simbolo, [forms_1.Validators.required, forms_1.Validators.maxLength(3)]],
            'status': [this.status, forms_1.Validators.required]
        });
        this.form.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data, _this.form, _this.formErrors, _this.validationMessages); });
        this.onValueChanged(); // (re)set validation messages now);
        return this.form;
    };
    return Moneda;
}(fire_provider_1.FireFactoryService));
exports.Moneda = Moneda;
//# sourceMappingURL=moneda.model.js.map