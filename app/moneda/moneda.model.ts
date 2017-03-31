import {FireFactoryService} from '../providers/fire.provider';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

export class Moneda extends FireFactoryService {
    public form: FormGroup;
    private fb: FormBuilder;
    submitted = false;
    public $key: String;
    public $exists: String;
    public nombre: String;
    public simbolo: String;
    public status: Boolean;
    public propiedad: Array<any>;


    constructor() {
        super();
    }

    buildForm(form: FormGroup): FormGroup {

        this.fb = new FormBuilder();
        this.form = form;
        this.form = this.fb.group({
            '$key': this.$key,
            '$exists': this.$exists,
            'propiedad': this.propiedad,
            'nombre': [this.nombre, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24),
            ]
            ],
            'simbolo': [this.simbolo, [Validators.required, Validators.maxLength(3)]],
            'status': [this.status, Validators.required]
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data, this.form, this.formErrors, this.validationMessages));

        this.onValueChanged(); // (re)set validation messages now);

        return this.form;
    }

    formErrors = {
        'nombre': '',
        'simbolo': '',
        'status': ''
    };
    validationMessages = {
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
}
