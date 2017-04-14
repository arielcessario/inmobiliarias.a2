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
var Propiedad = (function (_super) {
    __extends(Propiedad, _super);
    // public general: FormArray;
    // public otro: FormArray;
    function Propiedad() {
        var _this = _super.call(this) || this;
        _this.form = new forms_1.FormGroup({});
        _this.submitted = false;
        _this.formErrors = {
            'banos': '',
            'descripcion': '',
            'moneda': '',
            'general': '',
            'otro': '',
        };
        _this.validationMessages = {
            'banos': {},
            'descripcion': {
                'required': 'Name is required.',
                'minlength': 'Name must be at least 4 characters long.',
                'maxlength': 'Name cannot be more than 24 characters long.'
            },
            'moneda': {
                'required': 'Power is required.'
            },
            'general': {},
            'otro': {},
        };
        return _this;
    }
    Propiedad.prototype.buildForm = function () {
        var _this = this;
        // Declore valores default para el reseteo del form
        this.formDefaults = {
            'banos': '',
            'descripcion': '',
            'moneda': 0,
            'general': 0,
            'otro': false
        };
        // Comienzo a armar el formulario
        this.fb = new forms_1.FormBuilder();
        // Declaro un array por cada tabla hija que quiera agregar
        var arr = this.fb.array([]);
        var arrOtro = this.fb.array([]);
        // Declaro el formulario
        this.form = this.fb.group({
            '$key': this.$key,
            '$exists': this.$exists,
            'banos': this.banos,
            'descripcion': [this.descripcion, [
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(4),
                    forms_1.Validators.maxLength(24),
                ]
            ],
            'moneda': [this.moneda, [forms_1.Validators.required]],
            'general': arr,
            'otro': arrOtro
        });
        // Genero todos los datos para las tablas hijas
        // por cada tabla hija se debe llamar a generate Array
        this.generateArray(arr, this.fb, 'general', false);
        this.generateArray(arrOtro, this.fb, 'otro', true);
        // Espero la actualización de los datos para poder mostrar en la vista
        var observable = this.notification$;
        observable.subscribe(function (data) {
            _this._items[data.nombre] = data.data;
        });
        // Me subscribo al servicio de value chanes con mis datos
        this.form.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data, _this.form, _this.formErrors, _this.validationMessages); });
        this.onValueChanged(); // (re)set validation messages now);
        return this.form;
    };
    return Propiedad;
}(fire_provider_1.FireFactoryService));
exports.Propiedad = Propiedad;
//# sourceMappingURL=propiedad.model.js.map