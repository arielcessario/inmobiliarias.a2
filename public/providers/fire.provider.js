"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fire_cache_provider_1 = require("./fire.cache.provider");
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
        this.name = this["constructor"].name.toString().toLowerCase();
        this.fireCache = new fire_cache_provider_1.FireCacheProvider();
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
    FireFactoryService.init = function (af) {
        FireFactoryService.af = af;
    };
    FireFactoryService.prototype.getUserData = function () {
    };
    FireFactoryService.prototype.login = function () {
    };
    FireFactoryService.prototype.get = function () {
        return this.fireCache.get();
    };
    /**
     * @brief Update del dato y sus hijos
     * @details [long description]
     *
     * @param key [description]
     * @param obj [description]
     */
    FireFactoryService.prototype.update = function (key, obj) {
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
            }
            else {
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
    };
    FireFactoryService.prototype.create = function (form) {
        var items = FireFactoryService.af.database.list(this.name);
        var props = Object.getOwnPropertyNames(form.controls);
        var obj = {};
        for (var i in props) {
            if (props[i] != '$key' && props[i] != '$exists') {
                obj[props[i]] = form.controls[props[i]].value;
            }
        }
        return items.push(obj);
    };
    FireFactoryService.prototype.delete = function () {
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
    FireFactoryService.prototype.onSubmit = function (form) {
        if (!form.valid) {
            return;
        }
        if (form.controls['$key'].value == null) {
            return this.create(form).then(function (res) { return console.log(res.key); });
        }
        else {
            this.update(form.controls['$key'].value, form.controls);
        }
        // this.submitted = true;
        // this.hero = this.heroForm.value;
    };
    /**
     * Selecciona un item determinado
     * @param key
     * @param form
     */
    FireFactoryService.prototype.selectItem = function (key, form) {
        FireFactoryService.af.database.object('/' + this.name + '/' + key).subscribe(function (data) {
            this.item = data;
            var props = Object.getOwnPropertyNames(data);
            for (var i in props) {
                form.controls[props[i]].setValue(data[props[i]]);
            }
        });
    };
    return FireFactoryService;
}());
exports.FireFactoryService = FireFactoryService;
//# sourceMappingURL=fire.provider.js.map