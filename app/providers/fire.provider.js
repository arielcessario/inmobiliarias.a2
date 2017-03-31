"use strict";
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
     * @details No pude inicializar AF en el constructor porque me lo sobreescribe la clase que la extiende
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
     * @brief Update del dato y sus hijos
     * @details [long description]
     *
     * @param y [description]
     * @param j [description]
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
                    }
                }
            }
            else {
                if (_ids[i] != "$exists" && _ids[i] != "$key") {
                    var name = {};
                    name[_ids[i]] = obj[_ids[i]];
                    this.itemsObs.update(key, name);
                }
            }
        }
    };
    FireFactoryService.prototype.create = function () {
    };
    FireFactoryService.prototype.delete = function () {
    };
    /**
     * @brief Join de estructuras
     * @details recibe un array de estructuras a relacionar estructuras
     *
     * @param s [description]
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
    return FireFactoryService;
}());
exports.FireFactoryService = FireFactoryService;
//# sourceMappingURL=fire.provider.js.map