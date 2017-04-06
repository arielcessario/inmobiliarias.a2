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
    function Propiedad() {
        var _this = _super.call(this) || this;
        _this.form = new forms_1.FormGroup({});
        _this.submitted = false;
        _this.formErrors = {
            'banos': '',
            'descripcion': '',
            'moneda': '',
            'general': ''
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
            'general': {}
        };
        return _this;
    }
    Propiedad.prototype.buildForm = function () {
        // this.general = generales;
        var _this = this;
        // console.log(form);
        // let allCategories: FormArray = new FormArray([]);
        // for (let i = 0; i < generales.length; i++) {
        //     let fg = new FormGroup({});
        //     fg.addControl(generales[i].nombre, new FormControl(false));
        //     allCategories.push(fg)
        // }
        //
        // console.log(allCategories);
        this.fb = new forms_1.FormBuilder();
        // this.form = form;
        var arr = this.fb.array([]);
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
            'general': arr
            // 'general': this.fb.array([
            //     this.fb.group({value:[false]}),
            //     this.fb.group({value:[false]}),
            //     this.fb.group({value:[true]})
            // ])
        });
        this.generateArray(arr, this.fb, 'general');
        var observable = this.notification$;
        observable.subscribe(function (data) {
            _this._items = data.data;
        });
        this.form.valueChanges
            .subscribe(function (data) { return _this.onValueChanged(data, _this.form, _this.formErrors, _this.validationMessages); });
        this.onValueChanged(); // (re)set validation messages now);
        return this.form;
    };
    return Propiedad;
}(fire_provider_1.FireFactoryService));
exports.Propiedad = Propiedad;
//# sourceMappingURL=propiedad.model.js.map