
import { AngularFire, FirebaseListObservable } from 'angularfire2';

export class FireCacheProvider {
	static cache: Array<any>;
	constructor (){
		if(FireCacheProvider.cache == undefined){

			FireCacheProvider.cache = [];
		}
	}

	public get(): Array<any>{
		return FireCacheProvider.cache;
	}

	public set(cache: Array<any>){
		FireCacheProvider.cache = cache;
	}
}