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
    public titulo: String;
    public moneda: Array<any>;
    // public general: FormArray;
    // public otro: FormArray;





    constructor() {
        super();

    }

    buildForm(): FormGroup {

        // Declore valores default para el reseteo del form
        this.formDefaults = {
            'banos': '',
            'descripcion': '',
            'titulo': '',
            'moneda': 0, // TODO: Para cuando es un indice, hacer una validación custom que se fije que el valor no sea 0 el seleccionado
            'general': 0,
            'otro': false
        };


        // Comienzo a armar el formulario
        this.fb = new FormBuilder();

        // Declaro un array por cada tabla hija que quiera agregar
        var arr = this.fb.array([]);
        var arrOtro = this.fb.array([]);


        // Declaro el formulario
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
            'titulo': [this.titulo, [
                Validators.required,
                Validators.minLength(4),
                Validators.maxLength(24),
            ]
            ],
            'moneda': [this.moneda, [Validators.required]],
            'general': arr,
            'otro': arrOtro
        });

        // Genero todos los datos para las tablas hijas
        // por cada tabla hija se debe llamar a generate Array
        this.generateArray(arr, this.fb, 'general', false);
        this.generateArray(arrOtro, this.fb, 'otro', true);


        // Espero la actualización de los datos para poder mostrar en la vista
        let observable: Observable<any> = this.notification$;
        observable.subscribe(data=> {
            this._items[data.nombre] = data.data;
        });

        // Me subscribo al servicio de value chanes con mis datos
        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data, this.form, this.formErrors, this.validationMessages));

        this.onValueChanged(); // (re)set validation messages now);

        return this.form;
    }


    formErrors = {
        'banos': '',
        'descripcion': '',
        'titulo': '',
        'moneda': '',
        'general': '',
        'otro': '',
    };
    validationMessages = {
        'banos': {},
        'descripcion': {
            'required': 'Name is required.',
            'minlength': 'Name must be at least 4 characters long.',
            'maxlength': 'Name cannot be more than 24 characters long.'
        },
        'titulo': {
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
}
