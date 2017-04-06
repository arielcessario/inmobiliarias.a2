import {FireFactoryService} from '../providers/fire.provider';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

export class General  extends FireFactoryService {
    public form: FormGroup;
    private fb: FormBuilder;
    submitted = false;
    public $key: String;
    public $exists: String;
    public banos: String;
    public descripcion: String;
    public moneda: Array<any>;


    constructor() {
        super();
    }

    buildForm(): FormGroup {

        this.fb = new FormBuilder();
        this.form = this.fb.group({
            '$key': this.$key,
            '$exists': this.$exists,
            'banos': this.banos,
            'descripcion': [this.descripcion, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24),
            ]
            ],
            'moneda': [this.moneda, [Validators.required]]
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data, this.form, this.formErrors, this.validationMessages));

        this.onValueChanged(); // (re)set validation messages now);

        return this.form;
    }

    formErrors = {
        'banos': '',
        'descripcion': '',
        'moneda': ''
    };
    validationMessages = {
        'banos': {
        },
        'descripcion': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.'
        },
        'moneda': {
            'required': 'Power is required.'
        }
    };
}
