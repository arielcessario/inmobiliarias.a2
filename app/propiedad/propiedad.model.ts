import {FireFactoryService} from '../providers/fire.provider';
import {FormGroup, FormBuilder, Validators, FormControl, FormArray, AbstractControl} from '@angular/forms';
import {Observable} from "rxjs/Rx";

export class Propiedad extends FireFactoryService {
    public form: FormGroup = new FormGroup({});
    private fb: FormBuilder;
    submitted = false;
    public $key: String;
    public $exists: String;
    public banos: String;
    public descripcion: String;
    public moneda: Array<any>;
    public general: FormArray;


    public _items: Array<any>;


    constructor() {
        super();
    }

    buildForm(): FormGroup {
        // this.general = generales;

        // console.log(form);
        // let allCategories: FormArray = new FormArray([]);
        // for (let i = 0; i < generales.length; i++) {
        //     let fg = new FormGroup({});
        //     fg.addControl(generales[i].nombre, new FormControl(false));
        //     allCategories.push(fg)
        // }
        //
        // console.log(allCategories);


        this.fb = new FormBuilder();
        // this.form = form;

        let arr = this.fb.array([]);

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
            'moneda': [this.moneda, [Validators.required]],
            'general': arr
            // 'general': this.fb.array([
            //     this.fb.group({value:[false]}),
            //     this.fb.group({value:[false]}),
            //     this.fb.group({value:[true]})
            // ])
        });
        this.generateArray(arr, this.fb, 'general');


        let observable: Observable<any> = this.notification$;
        observable.subscribe(data=> {
            this._items = data.data;
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data, this.form, this.formErrors, this.validationMessages));

        this.onValueChanged(); // (re)set validation messages now);

        return this.form;
    }




    formErrors = {
        'banos': '',
        'descripcion': '',
        'moneda': '',
        'general': ''
    };
    validationMessages = {
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
}
