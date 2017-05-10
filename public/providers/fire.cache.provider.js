"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var FireCacheProvider = (function () {
    function FireCacheProvider() {
        if (FireCacheProvider.status$ == undefined) {
            FireCacheProvider.status$ = new Rx_1.Observable(function (observer) {
                FireCacheProvider.observer = observer;
            }).share();
            // Sin esto no se subscribe?
            FireCacheProvider.status$.subscribe(function (data) {
            });
        }
        if (FireCacheProvider.cache == undefined) {
            FireCacheProvider.cache = [];
        }
    }
    FireCacheProvider.prototype.ngOnInit = function () {
    };
    FireCacheProvider.prototype.get = function (cache) {
        if (cache != undefined) {
            FireCacheProvider.list[cache] = true;
            if (FireCacheProvider.observer != undefined) {
                FireCacheProvider.observer.next({
                    data: { action: 'working' }
                });
            }
            var subs_1 = FireCacheProvider.cache[cache].subscribe(function (data) {
                delete FireCacheProvider.list[cache];
                if (FireCacheProvider.observer != undefined) {
                    if (Object.getOwnPropertyNames(FireCacheProvider.list).length == 0) {
                        FireCacheProvider.observer.next({
                            data: { action: 'free' }
                        });
                    }
                }
                subs_1.unsubscribe();
            });
            return FireCacheProvider.cache[cache];
        }
        else {
            return FireCacheProvider.cache;
        }
    };
    FireCacheProvider.prototype.set = function (cache) {
        FireCacheProvider.cache = cache;
    };
    FireCacheProvider.prototype.status = function () {
        return FireCacheProvider.status$;
    };
    return FireCacheProvider;
}());
FireCacheProvider.list = {};
exports.FireCacheProvider = FireCacheProvider;
//# sourceMappingURL=fire.cache.provider.js.map