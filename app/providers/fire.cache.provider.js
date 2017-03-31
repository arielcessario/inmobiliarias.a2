"use strict";
var FireCacheProvider = (function () {
    function FireCacheProvider() {
        if (FireCacheProvider.cache == undefined) {
            FireCacheProvider.cache = [];
        }
    }
    FireCacheProvider.prototype.get = function () {
        return FireCacheProvider.cache;
    };
    FireCacheProvider.prototype.set = function (cache) {
        FireCacheProvider.cache = cache;
    };
    return FireCacheProvider;
}());
exports.FireCacheProvider = FireCacheProvider;
//# sourceMappingURL=fire.cache.provider.js.map