"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var fire_provider_1 = require("../providers/fire.provider");
var Direccion = (function (_super) {
    __extends(Direccion, _super);
    function Direccion($key, nombre, numero, propiedad) {
        var _this = _super.call(this) || this;
        _this.$key = $key;
        _this.nombre = nombre;
        _this.numero = numero;
        _this.propiedad = propiedad;
        return _this;
    }
    return Direccion;
}(fire_provider_1.FireFactoryService));
exports.Direccion = Direccion;
//# sourceMappingURL=direccion.js.map