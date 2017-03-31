import { FireFactoryService } from '../providers/fire.provider';

export class Direccion extends FireFactoryService{
	public $key: string;
	public nombre: string;
	public numero: string;
	public propiedad: string;

	constructor($key: string, nombre:string, numero:string, propiedad:string){
		super();

		this.$key=$key;
		this.nombre=nombre;
		this.numero=numero;
		this.propiedad=propiedad;
	}

	

}