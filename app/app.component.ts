import { Component, OnInit } from '@angular/core';



import { Propiedad } from './propiedad/propiedad.model';
import { Direccion } from './direccion/direccion.model';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { FireFactoryService } from './providers/fire.provider';


// import { FireCacheProvider } from './fire.provider';


@Component({
	selector: 'my-app',
	templateUrl: 'app/app.component.html'
	// providers: [FireFactoryService]
})
export class AppComponent implements OnInit {
	direcciones: Direccion;
	propiedades: Propiedad;
	// monedas: Moneda;


	// refDirecciones: CacheFactory;
	// refPropiedades: CacheFactory;

	ngOnInit() {
		// console.log(this.direccion);
	}

	constructor(af: AngularFire) {

		// Este llamado inicializa Firebase
		FireFactoryService.init(af);

		// this.direcciones = new Direccion('','','','');
		// this.propiedades = new Propiedad();
		// this.monedas = new Moneda();

		// this.direcciones.join(['propiedad']);

		// this.propiedades.load();

		// this.propiedad.get()(data => this.direcciones = data);
		// this.direccion.get()(data => {
			// 	this.direcciones = data;
			// 	this.propiedad.load('direccion', this.direcciones);
			// });

			// console.log(this);
			// this.direccion.numero = '11111';
			// console.log(this.direccion);
			// facDirecciones= FireFactoryService()<Direccion>;
			// console.log(this.facDirecciones);

			// this.refPropiedades = fp.cacheFactory('propiedad');
			// this.refPropiedades.subscribe(data => this.propiedades = data);

			// this.refDirecciones = fp.cacheFactory('direccion');
			// this.refDirecciones.subscribe(data => this.direcciones = data);


		}


	}

