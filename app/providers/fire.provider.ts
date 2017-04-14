import {AngularFire, FirebaseListObservable, FirebaseObjectObservable, AuthProviders, AuthMethods} from 'angularfire2';

import {FireCacheProvider} from './fire.cache.provider';
import {Observer, Observable} from "rxjs/Rx";

export class FireFactoryService {

    protected fireCache: FireCacheProvider;
    protected name: string;
    protected formDefaults: {};
    protected cache: Array<any>;
    public items: Array<any>;
    static af: AngularFire;


    notification$: Observable<any>;
    private observer: Observer<any>;
    public _items: {} = {}; // TODO: Estático? Acceder desde algún lado centralizado, mas que nada por prolijidad

    public limitToFirst: number = 10;
    public limitToLast: number = 100;

    /**
     * TODO:
     * 1. No guarde los false registros en false, y que si hay uno lo borre
     * 2. Que todos los registros guarden fecha de creación y última actualización?
     */

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

        this.cache[this.name] = FireFactoryService.af.database.list('/' + this.name, {
            query: {
                orderByKey: true
            }
        });
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


    /**
     * Devuelve el cache solicitado por parámetro o devuelve un array observable de todas las referencias.
     * @param cache
     * @returns {any|Array<any>}
     */
    get(cache: string = this.name): FirebaseListObservable<any> {
        return this.fireCache.get(cache);
    }


    /**
     * Genera un array de controles para utilizar cuando se invoca una tabla hija
     * Ejemplo: this.generateArray(arr, this.fb, 'general', true);
     * @param arr, objeto form.array en el cual se almacenarán cada row de la tabla hija
     * @param fb, formbuilder
     * @param rama, rama que se desea traer
     * @param bidireccional, este parámetro especifica si al momento de guardar, se guardarán también indices
     * cruzados.
     */
    generateArray(arr: any, fb: any, rama: string, bidireccional: boolean = true) {

        if (this._items[rama] != undefined) {
            return;
        }

        this.get(rama).subscribe(data=> {
            let encontrado = false;
            for (var i in data) {
                for (var x in arr.controls) {
                    if (arr.controls[x].value['$key'] == data[i].$key) {
                        encontrado = true;
                    }
                }
                if (!encontrado) {
                    let _item = fb.group({value: 0, $key: data[i].$key, $bidireccional: bidireccional});
                    arr.push(_item);
                }
                encontrado = false;
            }

            this.observer.next({
                data: data,
                nombre: rama
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
        ret.items.update(form.controls['$key'].value, ret.obj);

        // Esta sección tiene que hacer update de las ramas
        // 1. Busco la rama: rama(otro)/id:otro/padre(propiedad)/{id_padre:value}
        let val = {};
        let index_keys = Object.getOwnPropertyNames(ret.indexes);

        for (let i in index_keys) {
            let _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
            for (let x in _keys) {
                val[form.controls['$key'].value] = (ret.obj[index_keys[i]][_keys[x]] == undefined) ? false : ret.obj[index_keys[i]][_keys[x]];
                FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + this.name).update(val);
            }
        }

        this.resetForm(form);

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

    /**
     * Crea un registro en la base y sus hijos
     * @param form
     * TODO: No está creando los hijos
     */
    create(form: any) {
        let ret = this.parseForm(form);

        ret.items.push(ret.obj).then(res => {
            let val = {};
            let index_keys = Object.getOwnPropertyNames(ret.indexes);

            for (let i in index_keys) {
                let _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
                for (let x in _keys) {
                    val[res.key] = (ret.obj[index_keys[i]][_keys[x]] == undefined) ? false : ret.obj[index_keys[i]][_keys[x]];
                    FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + this.name).update(val);
                }
            }
        });

        this.resetForm(form);

    }


    /**
     * Remueve un item y sus hijos
     * @param item
     * @param form
     */
    remove(item: any, form: any) {


        // 1. necesito los campos del formulario de indexes
        // 2. Con esos campos los busco en el item
        // 3. armo un for con las propiedades para borrar a cada uno
        let ret = this.parseForm(form);

        const itemObservable = FireFactoryService.af.database.object(this.name + '/' + item.$key);
        itemObservable.remove();

        // Elimino a los hijos
        let index_keys = Object.getOwnPropertyNames(ret.indexes);
        for (let i in index_keys) {
            let _keys = Object.getOwnPropertyNames(item[index_keys[i]]);
            for (let x in _keys) {
                FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + this.name + '/' + item.$key + '/').remove();
            }
        }

        this.resetForm(form);
    }


    /**
     * Convierte un form a la estructura de datos que necesito para guardar en firebase.
     * @param form
     * @returns {{items: FirebaseListObservable<any[]>, obj: {}, indexes: {}}}
     */
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
                        obj[props[i]][_branchName] = (form.controls[props[i]].value[x]['value'] == undefined) ? false : form.controls[props[i]].value[x]['value'];


                        if (form.controls[props[i]].value[x]['$bidireccional']) {
                            indexes[props[i]][_branchName] = true;
                        }
                    }

                } else {
                    obj[props[i]] = form.controls[props[i]].value;
                }
            }
        }
        return {items: items, obj: obj, indexes: indexes};
    }

    /**
     * @brief Join de estructuras
     * @details recibe un array de estructuras a relacionar estructuras
     *
     * @param params [description]
     */
    join(params: string[]) {

        this.get(this.name).subscribe(response => {

            for (var y in params) {
                for (var i in response) {
                    var _ids = Object.getOwnPropertyNames(response[i][params[y]]);
                    if (response[i][params[y]].obs == undefined) {
                        response[i][params[y]].obs = [];
                    }
                    // Genero array de objetos qe traje de la base y se las agrego al obs (objeto creado para contener
                    // la respuesta)
                    for (var x in _ids) {
                        response[i][params[y]].obs.push(FireFactoryService.af.database.object('/' + params[y] + '/' + [_ids[x]]));
                    }

                }
            }

            this.items = response;

        })
    }


    /**
     * Servicio que escucha por cambios realizados en el form.
     * @param data
     * @param form
     * @param formErrors
     * @param validationMessages
     */
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


    /**
     * Evento submit
     * @param form
     */
    onSubmit(form: any) {
        console.log(form);
        if (!form.valid) {
            return;
        }

        if (form.controls['$key'].value == null) {
            this.create(form);
        } else {
            this.update(form);
        }
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
                                    if (subprops[y] != '$key' && subprops[y] != '$bidireccional') {
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


    /**
     * Limpia el formulario, no puedo usar el reset porque borra las referencias a los subarrays
     * @param form
     */
    resetForm(form: any) {

        let props = Object.getOwnPropertyNames(form.controls);
        for (var i in props) {
            if (form.controls[props[i]] != undefined) {

                // Si es una instancia de array, en firebase es una dependencia, tiene un árbol asociado
                if (form.controls[props[i]].controls instanceof Array) {
                    for (var x in form.controls[props[i]].controls) {
                        let subprops = Object.getOwnPropertyNames(form.controls[props[i]].controls[x].controls);
                        let _key = form.controls[props[i]].controls[x].controls['$key'].value;

                        for (var y in subprops) {
                            if (subprops[y] != '$key' && subprops[y] != '$bidireccional') {

                                form.controls[props[i]].controls[x].controls[subprops[y]].setValue(this.formDefaults[props[i]]);
                            }
                        }
                    }
                } else {

                    form.controls[props[i]].setValue(this.formDefaults[props[i]]);
                }
            }
        }
        // this.onValueChanged();

    }


    // NAVEGACION //
    next(){

    }

    prev(){

    }

    goTo(){

    }

}

