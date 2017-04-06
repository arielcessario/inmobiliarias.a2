"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fire_cache_provider_1 = require("./fire.cache.provider");
var Rx_1 = require("rxjs/Rx");
var FireFactoryService = (function () {
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
        this.name = this["constructor"].name.toString().toLowerCase();
        this.fireCache = new fire_cache_provider_1.FireCacheProvider();
        this.cache = this.fireCache.get();
        this.itemsObs = FireFactoryService.af.database.list('/' + this.name);
        this.cache[this.name] = this.itemsObs;
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
    FireFactoryService.prototype.get = function (cache) {
        return this.fireCache.get(cache);
    };
    /**
     * TODO: Pasar a FIRE.PROVIDER
     * @param arr
     * @param fb
     */
    FireFactoryService.prototype.generateArray = function (arr, fb, rama) {
        var _this = this;
        // return (this.get()['general']);
        this.get(rama).subscribe(function (data) {
            // items_ = data;
            for (var i in data) {
                var _item = fb.group({ value: 0, $key: data[i].$key });
                arr.push(_item);
            }
            // return data;
            _this.observer.next({
                data: data
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
        // TODO: AGREGAR PARA QUE ESTO SEA OPCIONAL PARA RELACIONES UNIDIRECCIONALES
        // En el caso de generales, si va a estar en todos lados, no necesita referencia de los dos lados
        ret.items.update(form.controls['$key'].value, ret.obj);
        var val = {};
        val[form.controls['$key'].value] = true;
        var index_keys = Object.getOwnPropertyNames(ret.indexes);
        for (var i in index_keys) {
            var _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
            for (var x in _keys) {
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
    };
    FireFactoryService.prototype.create = function (form) {
        var _this = this;
        var ret = this.parseForm(form);
        // TODO: AGREGAR PARA QUE ESTO SEA OPCIONAL PARA RELACIONES UNIDIRECCIONALES
        // En el caso de generales, si va a estar en todos lados, no necesita referencia de los dos lados
        ret.items.push(ret.obj).then(function (res) {
            var val = {};
            val[res.key] = true;
            var index_keys = Object.getOwnPropertyNames(ret.indexes);
            for (var i in index_keys) {
                var _keys = Object.getOwnPropertyNames(ret.indexes[index_keys[i]]);
                for (var x in _keys) {
                    FireFactoryService.af.database.object('/' + index_keys[i] + '/' + _keys[x] + '/' + _this.name).update(val);
                }
            }
        });
    };
    FireFactoryService.prototype.remove = function ($key, form) {
        var itemObservable = FireFactoryService.af.database.object(this.name + '/' + $key);
        itemObservable.remove();
    };
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
                        obj[props[i]][_branchName] = form.controls[props[i]].value[x]['value'];
                        indexes[props[i]][_branchName] = true;
                    }
                }
                else {
                    obj[props[i]] = form.controls[props[i]].value;
                }
            }
        }
        console.log(obj);
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
        this.itemsObs.subscribe(function (response) {
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
            _this.items = response;
        });
    };
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
    FireFactoryService.prototype.onSubmit = function (form) {
        console.log(form);
        if (!form.valid) {
            return;
        }
        if (form.controls['$key'].value == null) {
            this.create(form);
            // return this.create(form).then(res => console.log(res.key));
        }
        else {
            this.update(form);
        }
        // this.submitted = true;
        // this.hero = this.heroForm.value;
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
                                if (subprops[y] != '$key') {
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
    return FireFactoryService;
}());
exports.FireFactoryService = FireFactoryService;
//# sourceMappingURL=fire.provider.js.map