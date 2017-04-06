import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods} from 'angularfire2';

import {FireCacheProvider} from './fire.cache.provider';
import {Observer, Observable} from "rxjs/Rx";

export class FireFactoryService {

    protected fireCache: FireCacheProvider;
    protected name: string;
    protected cache: Array<any>;
    public items: Array<any>;
    public itemsObs: FirebaseListObservable<any[]>;
    public item: FirebaseListObservable<any[]>;
    static af: AngularFire;


    notification$: Observable<any>;
    private observer: Observer<any>;


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

        this.itemsObs = FireFactoryService.af.database.list('/' + this.name);

        this.cache[this.name] = this.itemsObs;
        this.fireCache.set(this.cache);


        // Observer para que cuando se actualicen algunas cosas, se pueda ver el cambio desde la clase que hereda.
        this.notification$ = new Observable(observer => this.observer = observer).share();


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


    get(cache: string): FirebaseListObservable<any> {
        return this.fireCache.get(cache);
    }


    /**
     * TODO: Pasar a FIRE.PROVIDER
     * @param arr
     * @param fb
     */
    generateArray(arr: any, fb: any, rama: string) {
        // return (this.get()['general']);
        this.get(rama).subscribe(data=> {

            // items_ = data;
            for (var i in data) {
                let _item = fb.group({value: 0, $key: data[i].$key});
                arr.push(_item);
            }


            // return data;

            this.observer.next({
                data: data
            });
        });
    }

    /**
     * @brief Update del dato y sus hijos
     * @details [long description]
     *
     * @param form [description]
     */
    update(form: any) {

        let ret = this.parseForm(form);

        // TODO: AGREGAR PARA QUE ESTO SEA OPCIONAL PARA RELACIONES UNIDIRECCIONALES
        // En el caso de generales, si va a estar en todos lados, no necesita referencia de los dos lados
        ret.items.update(form.controls['$key'].value, ret.obj);

        let val = {};
        val[form.controls['$key'].value] = true;
        let index_keys = Object.getOwnPropertyNames(ret.indexes);

        for (let i in index_keys) {
            let _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
            for (let x in _keys) {
                FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + this.name).update(val);
            }
        }

        // // Hijos que pueden venir del join, tienen que estar siempre adentro de un objeto con el nombre 'obs' de observable
        // var _childs = [];
        // // Lista completa de Ids que tiene el objeto TODO: se pueden excluir $exists y $key
        // var _ids = Object.getOwnPropertyNames(obj);
        // // Objeto auxiliar ME PARECE QUE NO HACE FALTA
        // // let _obj = {};
        // console.log(obj);
        //
        //
        // // Recorro todas las propiedades del objeto
        // for (var i in _ids) {
        //     // Si es un observable no pertenece al objeto original, es un join
        //     if (obj[_ids[i]]['obs'] != undefined) {
        //
        //         // Si no existe lo creo en hijos para después poder guardarlos por separado
        //         if (_childs[_ids[i]] == undefined) {
        //             _childs[_ids[i]] = [];
        //         }
        //         _childs[_ids[i]] = obj[_ids[i]]['obs'];
        //
        //         // Obtengo todos los nombres de las propiedades del observable
        //         var _innerIds = Object.getOwnPropertyNames(obj[_ids[i]]);
        //         for (var x in _innerIds) {
        //             // Las que no son observables, hago update
        //             if (_innerIds[x] != 'obs') {
        //                 var name = {};
        //                 name[_innerIds[x]] = obj[_ids[i]];
        //
        //                 // obj[_ids[i]].update(key, name);
        //
        //                 // if(_obj[_ids[i]] == undefined){
        //                 // 	_obj[_ids[i]] = {};
        //                 // }
        //                 // _obj[_ids[i]][_innerIds[x]]= obj[_ids[i]][_innerIds[x]];
        //             }
        //         }
        //         // delete _obj[_ids[i]]['obs'];
        //     } else {
        //         if (_ids[i] != "$exists" && _ids[i] != "$key") {
        //             var name = {};
        //             // console.log(obj[_ids[i]]);
        //             // if (obj[_ids[i]].value != null) {
        //             name[_ids[i]] = obj[_ids[i]].value;
        //             // } else {
        //             //     name[_ids[i]] = obj[_ids[i]];
        //             // }
        //             this.itemsObs.update(key, name);
        //
        //         }
        //     }
        // }
    }

    create(form: any) {
        let ret = this.parseForm(form);

        // TODO: AGREGAR PARA QUE ESTO SEA OPCIONAL PARA RELACIONES UNIDIRECCIONALES
        // En el caso de generales, si va a estar en todos lados, no necesita referencia de los dos lados
        ret.items.push(ret.obj).then(res => {
            let val = {};
            val[res.key] = true;
            let index_keys = Object.getOwnPropertyNames(ret.indexes);

            for (let i in index_keys) {
                let _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
                for (let x in _keys) {
                    FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + this.name).update(val);
                }
            }
        });
    }

    remove($key: string, form: any) {
        const itemObservable = FireFactoryService.af.database.object(this.name + '/' + $key);
        itemObservable.remove();
    }


    parseForm(form: any): any {
        const items = FireFactoryService.af.database.list(this.name);
        const indexes = {};

        let props = Object.getOwnPropertyNames(form.controls);
        let obj = {};
        for (var i in props) {
            if (props[i] != '$key' && props[i] != '$exists') {

                if (form.controls[props[i]].value instanceof Array) {
                    obj[props[i]] = {};

                    // Meto las ramas que tengo que actualizar después
                    // Después del push, tengo que obtener el key y para cada una
                    // de las ramas en indexes, otro push en: rama/this.name/new_key:true
                    //

                    indexes[props[i]] = {};

                    for (let x in form.controls[props[i]].value) {
                        let _branchName = form.controls[props[i]].value[x]['$key'];
                        obj[props[i]][_branchName] = form.controls[props[i]].value[x]['value'];
                        indexes[props[i]][_branchName] = true;
                    }

                } else {
                    obj[props[i]] = form.controls[props[i]].value;
                }
            }
        }
        console.log(obj);
        return {items: items, obj: obj, indexes: indexes};
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

    // getGeneral(arr: any, fb: any, cache: string, _items: any) {
    //     // return (this.get()['general']);
    //     (this.get()[cache]).subscribe(data=> {
    //
    //         _items = data;
    //         for (var i in data) {
    //             let __item = fb.group({value: 0, $key: data[i].$key});
    //             arr.push(__item);
    //         }
    //
    //     });
    // }


    onSubmit(form: any) {
        console.log(form);
        if (!form.valid) {
            return;
        }

        if (form.controls['$key'].value == null) {
            this.create(form);
            // return this.create(form).then(res => console.log(res.key));
        } else {
            this.update(form);
        }

        // this.submitted = true;
        // this.hero = this.heroForm.value;
    }


    /**
     * Selecciona un item determinado de firebase y lo envía al formulario
     * Toma todas las propiedades de la respuesta, y las compara con los controles del formulario.
     * Los nombres de las propiedades del modelo en firebase, tienen que ser las mismas que los componentes del form
     * @param key
     * @param form
     */
    selectItem(key: string, form: any) {
        FireFactoryService.af.database.object('/' + this.name + '/' + key).subscribe(function (data) {

                this.item = data;
                let props = Object.getOwnPropertyNames(data);
                for (var i in props) {
                    if (form.controls[props[i]] != undefined) {

                        // Si es una instancia de array, en firebase es una dependencia, tiene un árbol asociado
                        if (form.controls[props[i]].controls instanceof Array) {
                            for (var x in form.controls[props[i]].controls) {
                                let subprops = Object.getOwnPropertyNames(form.controls[props[i]].controls[x].controls);
                                let _key = form.controls[props[i]].controls[x].controls['$key'].value;

                                for (var y in subprops) {
                                    if (subprops[y] != '$key') {
                                        form.controls[props[i]].controls[x].controls[subprops[y]].setValue(data[props[i]][_key]);
                                    }
                                }
                            }
                        } else {
                            form.controls[props[i]].setValue(data[props[i]]);
                        }
                    }
                }
            }
        );
    }

}

