import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods} from 'angularfire2';

import {FireCacheProvider} from './fire.cache.provider';
import {isUndefined} from "util";

export class FireFactoryService {

    protected fireCache: FireCacheProvider;
    protected name: string;
    protected cache: Array<any>;
    public items: Array<any>;
    public itemsObs: FirebaseListObservable<any[]>;
    public item: FirebaseListObservable<any[]>;
    static af: AngularFire;


    /**
     * @brief Constructor del proveedor de fireAngular
     * @details El constructor
     * - Obtiene el cache del provider
     * - Toma el nombre del la clase a la que extiende
     * - Revisa si el nombre existe
     * - Si no existe, lo crea
     * - Devuelve el caché al provider.
     */
    constructor() {

        this.name = this["constructor"].name.toString().toLowerCase();
        this.fireCache = new FireCacheProvider();
        this.cache = this.fireCache.get();


        // if(this.cache[this.name] == undefined){
        // 	this.cache[this.name]={};
        // }


        this.itemsObs = FireFactoryService.af.database.list('/' + this.name);

        this.cache[this.name] = this.itemsObs;
        this.fireCache.set(this.cache);


        // this.items.subscribe(data =>
        // 	{
        // 		this.cache[this.name] = data;
        // 		this.fireCache.set(this.cache);
        // 		console.log(this.cache);
        // 	});


    }

    /**
     * @brief Inicializa AF
     * @details No pude inicializar AF en el constructor porque me lo sobreescribe la clase que la extiende.
     * Hay que inizializarlo en el app.component, en el constructor
     *    constructor(af: AngularFire) {
     * 	        FireFactoryService.init(af);
     * 	  }
     * @todo: arreglar que no se pueda inicializar af desde acá
     *
     * @param f [description]
     */
    static init(af: AngularFire) {
        FireFactoryService.af = af;
    }


    getUserData(): any {
    }

    login() {
    }


    get() {
        return this.fireCache.get();
    }

    /**
     * @brief Update del dato y sus hijos
     * @details [long description]
     *
     * @param key [description]
     * @param obj [description]
     */
    update(key: string, obj: any) {
        // Hijos que pueden venir del join, tienen que estar siempre adentro de un objeto con el nombre 'obs' de observable
        var _childs = [];
        // Lista completa de Ids que tiene el objeto TODO: se pueden excluir $exists y $key
        var _ids = Object.getOwnPropertyNames(obj);
        // Objeto auxiliar ME PARECE QUE NO HACE FALTA
        // let _obj = {};
        console.log(obj);


        // Recorro todas las propiedades del objeto
        for (var i in _ids) {
            // Si es un observable no pertenece al objeto original, es un join
            if (obj[_ids[i]]['obs'] != undefined) {

                // Si no existe lo creo en hijos para después poder guardarlos por separado
                if (_childs[_ids[i]] == undefined) {
                    _childs[_ids[i]] = [];
                }
                _childs[_ids[i]] = obj[_ids[i]]['obs'];

                // Obtengo todos los nombres de las propiedades del observable
                var _innerIds = Object.getOwnPropertyNames(obj[_ids[i]]);
                for (var x in _innerIds) {
                    // Las que no son observables, hago update
                    if (_innerIds[x] != 'obs') {
                        var name = {};
                        name[_innerIds[x]] = obj[_ids[i]];

                        // obj[_ids[i]].update(key, name);

                        // if(_obj[_ids[i]] == undefined){
                        // 	_obj[_ids[i]] = {};
                        // }
                        // _obj[_ids[i]][_innerIds[x]]= obj[_ids[i]][_innerIds[x]];
                    }
                }
                // delete _obj[_ids[i]]['obs'];
            } else {
                if (_ids[i] != "$exists" && _ids[i] != "$key") {
                    var name = {};
                    // console.log(obj[_ids[i]]);
                    // if (obj[_ids[i]].value != null) {
                    name[_ids[i]] = obj[_ids[i]].value;
                    // } else {
                    //     name[_ids[i]] = obj[_ids[i]];
                    // }
                    this.itemsObs.update(key, name);

                }
            }
        }
    }

    create(form: any) {
        const items = FireFactoryService.af.database.list(this.name);

        let props = Object.getOwnPropertyNames(form.controls);
        let obj = {};
        for (var i in props) {
            if (props[i] != '$key' && props[i] != '$exists') {
                obj[props[i]] = form.controls[props[i]].value;
            }
        }
        return items.push(obj);
    }

    delete() {

    }


    /**
     * @brief Join de estructuras
     * @details recibe un array de estructuras a relacionar estructuras
     *
     * @param params [description]
     */
    join(params: string[]) {

        this.itemsObs.subscribe(response => {

            for (var y in params) {
                for (var i in response) {
                    var _ids = Object.getOwnPropertyNames(response[i][params[y]]);
                    if (response[i][params[y]].obs == undefined) {
                        response[i][params[y]].obs = [];
                    }
                    for (var x in _ids) {
                        response[i][params[y]].obs.push(FireFactoryService.af.database.object('/' + params[y] + '/' + [_ids[x]]));
                    }

                }
            }


            console.log(response);
            this.items = response;
        })
    }


    onValueChanged(data?: any, form?: any, formErrors?: any, validationMessages?: any) {
        if (!form) {
            return;
        }
        // const form = form;
        for (const field in formErrors) {
            // clear previous error message (if any)
            formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = validationMessages[field];
                for (const key in control.errors) {
                    formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }

    onSubmit(form: any) {
        if (!form.valid) {
            return;
        }

        if (form.controls['$key'].value == null) {
            return this.create(form).then(res => console.log(res.key));
        } else {
            this.update(form.controls['$key'].value, form.controls);
        }

        // this.submitted = true;
        // this.hero = this.heroForm.value;
    }


    /**
     * Selecciona un item determinado
     * @param key
     * @param form
     */
    selectItem(key: string, form: any) {
        FireFactoryService.af.database.object('/' + this.name + '/' + key).subscribe(function (data) {

                this.item = data;
                let props = Object.getOwnPropertyNames(data);
                for (var i in props) {

                    form.controls[props[i]].setValue(data[props[i]]);
                }
            }
        );
    }

}

