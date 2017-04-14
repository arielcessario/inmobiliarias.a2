"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fire_cache_provider_1 = require("./fire.cache.provider");
var Rx_1 = require("rxjs/Rx");
var FireFactoryService = (function () {
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
    function FireFactoryService() {
        var _this = this;
        this._items = {}; // TODO: Estático? Acceder desde algún lado centralizado, mas que nada por prolijidad
        this.limitToFirst = 10;
        this.limitToLast = 100;
        this.name = this["constructor"].name.toString().toLowerCase();
        this.fireCache = new fire_cache_provider_1.FireCacheProvider();
        this.cache = this.fireCache.get();
        this.cache[this.name] = FireFactoryService.af.database.list('/' + this.name, {
            query: {
                orderByKey: true
            }
        });
        this.fireCache.set(this.cache);
        // Observer para que cuando se actualicen algunas cosas, se pueda ver el cambio desde la clase que hereda.
        this.notification$ = new Rx_1.Observable(function (observer) { return _this.observer = observer; }).share();
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
    FireFactoryService.init = function (af) {
        FireFactoryService.af = af;
    };
    FireFactoryService.prototype.getUserData = function () {
    };
    FireFactoryService.prototype.login = function () {
    };
    /**
     * Devuelve el cache solicitado por parámetro o devuelve un array observable de todas las referencias.
     * @param cache
     * @returns {any|Array<any>}
     */
    FireFactoryService.prototype.get = function (cache) {
        if (cache === void 0) { cache = this.name; }
        return this.fireCache.get(cache);
    };
    /**
     * Genera un array de controles para utilizar cuando se invoca una tabla hija
     * Ejemplo: this.generateArray(arr, this.fb, 'general', true);
     * @param arr, objeto form.array en el cual se almacenarán cada row de la tabla hija
     * @param fb, formbuilder
     * @param rama, rama que se desea traer
     * @param bidireccional, este parámetro especifica si al momento de guardar, se guardarán también indices
     * cruzados.
     */
    FireFactoryService.prototype.generateArray = function (arr, fb, rama, bidireccional) {
        var _this = this;
        if (bidireccional === void 0) { bidireccional = true; }
        if (this._items[rama] != undefined) {
            return;
        }
        this.get(rama).subscribe(function (data) {
            var encontrado = false;
            for (var i in data) {
                for (var x in arr.controls) {
                    if (arr.controls[x].value['$key'] == data[i].$key) {
                        encontrado = true;
                    }
                }
                if (!encontrado) {
                    var _item = fb.group({ value: 0, $key: data[i].$key, $bidireccional: bidireccional });
                    arr.push(_item);
                }
                encontrado = false;
            }
            _this.observer.next({
                data: data,
                nombre: rama
            });
        });
    };
    /**
     * @brief Update del dato y sus hijos
     * @details [long description]
     *
     * @param form [description]
     */
    FireFactoryService.prototype.update = function (form) {
        var ret = this.parseForm(form);
        ret.items.update(form.controls['$key'].value, ret.obj);
        // Esta sección tiene que hacer update de las ramas
        // 1. Busco la rama: rama(otro)/id:otro/padre(propiedad)/{id_padre:value}
        var val = {};
        var index_keys = Object.getOwnPropertyNames(ret.indexes);
        for (var i in index_keys) {
            var _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
            for (var x in _keys) {
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
    };
    /**
     * Crea un registro en la base y sus hijos
     * @param form
     * TODO: No está creando los hijos
     */
    FireFactoryService.prototype.create = function (form) {
        var _this = this;
        var ret = this.parseForm(form);
        ret.items.push(ret.obj).then(function (res) {
            var val = {};
            var index_keys = Object.getOwnPropertyNames(ret.indexes);
            for (var i in index_keys) {
                var _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
                for (var x in _keys) {
                    val[res.key] = (ret.obj[index_keys[i]][_keys[x]] == undefined) ? false : ret.obj[index_keys[i]][_keys[x]];
                    FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + _this.name).update(val);
                }
            }
        });
        this.resetForm(form);
    };
    /**
     * Remueve un item y sus hijos
     * @param item
     * @param form
     */
    FireFactoryService.prototype.remove = function (item, form) {
        // 1. necesito los campos del formulario de indexes
        // 2. Con esos campos los busco en el item
        // 3. armo un for con las propiedades para borrar a cada uno
        var ret = this.parseForm(form);
        var itemObservable = FireFactoryService.af.database.object(this.name + '/' + item.$key);
        itemObservable.remove();
        // Elimino a los hijos
        var index_keys = Object.getOwnPropertyNames(ret.indexes);
        for (var i in index_keys) {
            var _keys = Object.getOwnPropertyNames(item[index_keys[i]]);
            for (var x in _keys) {
                FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + this.name + '/' + item.$key + '/').remove();
            }
        }
        this.resetForm(form);
    };
    /**
     * Convierte un form a la estructura de datos que necesito para guardar en firebase.
     * @param form
     * @returns {{items: FirebaseListObservable<any[]>, obj: {}, indexes: {}}}
     */
    FireFactoryService.prototype.parseForm = function (form) {
        var items = FireFactoryService.af.database.list(this.name);
        var indexes = {};
        var props = Object.getOwnPropertyNames(form.controls);
        var obj = {};
        for (var i in props) {
            if (props[i] != '$key' && props[i] != '$exists') {
                if (form.controls[props[i]].value instanceof Array) {
                    obj[props[i]] = {};
                    // Meto las ramas que tengo que actualizar después
                    // Después del push, tengo que obtener el key y para cada una
                    // de las ramas en indexes, otro push en: rama/this.name/new_key:true
                    //
                    indexes[props[i]] = {};
                    for (var x in form.controls[props[i]].value) {
                        var _branchName = form.controls[props[i]].value[x]['$key'];
                        obj[props[i]][_branchName] = (form.controls[props[i]].value[x]['value'] == undefined) ? false : form.controls[props[i]].value[x]['value'];
                        if (form.controls[props[i]].value[x]['$bidireccional']) {
                            indexes[props[i]][_branchName] = true;
                        }
                    }
                }
                else {
                    obj[props[i]] = form.controls[props[i]].value;
                }
            }
        }
        return { items: items, obj: obj, indexes: indexes };
    };
    /**
     * @brief Join de estructuras
     * @details recibe un array de estructuras a relacionar estructuras
     *
     * @param params [description]
     */
    FireFactoryService.prototype.join = function (params) {
        var _this = this;
        this.get(this.name).subscribe(function (response) {
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
            _this.items = response;
        });
    };
    /**
     * Servicio que escucha por cambios realizados en el form.
     * @param data
     * @param form
     * @param formErrors
     * @param validationMessages
     */
    FireFactoryService.prototype.onValueChanged = function (data, form, formErrors, validationMessages) {
        if (!form) {
            return;
        }
        // const form = form;
        for (var field in formErrors) {
            // clear previous error message (if any)
            formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = validationMessages[field];
                for (var key in control.errors) {
                    formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    /**
     * Evento submit
     * @param form
     */
    FireFactoryService.prototype.onSubmit = function (form) {
        console.log(form);
        if (!form.valid) {
            return;
        }
        if (form.controls['$key'].value == null) {
            this.create(form);
        }
        else {
            this.update(form);
        }
    };
    /**
     * Selecciona un item determinado de firebase y lo envía al formulario
     * Toma todas las propiedades de la respuesta, y las compara con los controles del formulario.
     * Los nombres de las propiedades del modelo en firebase, tienen que ser las mismas que los componentes del form
     * @param key
     * @param form
     */
    FireFactoryService.prototype.selectItem = function (key, form) {
        FireFactoryService.af.database.object('/' + this.name + '/' + key).subscribe(function (data) {
            this.item = data;
            var props = Object.getOwnPropertyNames(data);
            for (var i in props) {
                if (form.controls[props[i]] != undefined) {
                    // Si es una instancia de array, en firebase es una dependencia, tiene un árbol asociado
                    if (form.controls[props[i]].controls instanceof Array) {
                        for (var x in form.controls[props[i]].controls) {
                            var subprops = Object.getOwnPropertyNames(form.controls[props[i]].controls[x].controls);
                            var _key = form.controls[props[i]].controls[x].controls['$key'].value;
                            for (var y in subprops) {
                                if (subprops[y] != '$key' && subprops[y] != '$bidireccional') {
                                    form.controls[props[i]].controls[x].controls[subprops[y]].setValue(data[props[i]][_key]);
                                }
                            }
                        }
                    }
                    else {
                        form.controls[props[i]].setValue(data[props[i]]);
                    }
                }
            }
        });
    };
    /**
     * Limpia el formulario, no puedo usar el reset porque borra las referencias a los subarrays
     * @param form
     */
    FireFactoryService.prototype.resetForm = function (form) {
        var props = Object.getOwnPropertyNames(form.controls);
        for (var i in props) {
            if (form.controls[props[i]] != undefined) {
                // Si es una instancia de array, en firebase es una dependencia, tiene un árbol asociado
                if (form.controls[props[i]].controls instanceof Array) {
                    for (var x in form.controls[props[i]].controls) {
                        var subprops = Object.getOwnPropertyNames(form.controls[props[i]].controls[x].controls);
                        var _key = form.controls[props[i]].controls[x].controls['$key'].value;
                        for (var y in subprops) {
                            if (subprops[y] != '$key' && subprops[y] != '$bidireccional') {
                                form.controls[props[i]].controls[x].controls[subprops[y]].setValue(this.formDefaults[props[i]]);
                            }
                        }
                    }
                }
                else {
                    form.controls[props[i]].setValue(this.formDefaults[props[i]]);
                }
            }
        }
        // this.onValueChanged();
    };
    // NAVEGACION //
    FireFactoryService.prototype.next = function () {
    };
    FireFactoryService.prototype.prev = function () {
    };
    FireFactoryService.prototype.goTo = function () {
    };
    return FireFactoryService;
}());
exports.FireFactoryService = FireFactoryService;
//# sourceMappingURL=fire.provider.js.map