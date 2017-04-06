"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FireCacheProvider = (function () {
    function FireCacheProvider() {
        if (FireCacheProvider.cache == undefined) {
            FireCacheProvider.cache = [];
        }
    }
    FireCacheProvider.prototype.get = function (cache) {
        if (cache != undefined) {
            return FireCacheProvider.cache[cache];
        }
        else {
            return FireCacheProvider.cache;
        }
    };
    FireCacheProvider.prototype.set = function (cache) {
        FireCacheProvider.cache = cache;
    };
    return FireCacheProvider;
}());
exports.FireCacheProvider = FireCacheProvider;
//# sourceMappingURL=fire.cache.provider.js.map