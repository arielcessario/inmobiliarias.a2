"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var fire_provider_1 = require("../providers/fire.provider");
var Propiedad = (function (_super) {
    __extends(Propiedad, _super);
    function Propiedad($key) {
        var _this = _super.call(this) || this;
        _this.$key = $key;
        return _this;
    }
    return Propiedad;
}(fire_provider_1.FireFactoryService));
exports.Propiedad = Propiedad;
// export class Propiedad {
//   $key: string;
//   banos: string;
//   descripcion: string;
//   direccion: string;
//   fotos: string;
//   general: string;
//   habitaciones: string;
//   moneda: string;
//   otro: string;
//   precio: string;
//   servicio: string;
//   superficie_cubierta: string;
//   superficie_total: string;
//   tipoCalle: string;
//   tipoPropiedad: string;
//   titulo: string;
// }
//# sourceMappingURL=propiedad.js.map