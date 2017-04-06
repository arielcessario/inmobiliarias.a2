
export class FireCacheProvider {
	static cache: Array<any>;
	constructor (){
		if(FireCacheProvider.cache == undefined){

			FireCacheProvider.cache = [];
		}
	}

	public get(cache?:string){
		if(cache != undefined){
			return FireCacheProvider.cache[cache];
		}else{
			return FireCacheProvider.cache;
		}
	}

	public set(cache: Array<any>){
		FireCacheProvider.cache = cache;
	}
}