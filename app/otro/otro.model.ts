import {FireFactoryService} from '../providers/fire.provider';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

export class Otro  extends FireFactoryService {
    public form: FormGroup;
    private fb: FormBuilder;
    submitted = false;
    public $key: String;
    public $exists: String;
    public nombre: String;


    constructor() {
        super();
    }

    buildForm(): FormGroup {

        // Declore valores default para el reseteo del form
        this.formDefaults = {
            'nombre': ''
        };



        this.fb = new FormBuilder();
        this.form = this.fb.group({
            '$key': this.$key,
            '$exists': this.$exists,
            'nombre': this.nombre,
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data, this.form, this.formErrors, this.validationMessages));

        this.onValueChanged(); // (re)set validation messages now);

        return this.form;
    }

    formErrors = {
        'nombre': ''
    };
    validationMessages = {
        'nombre': {
        }
    };
}
