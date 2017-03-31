
import { FireFactoryService } from '../providers/fire.provider';

export class Propiedad extends FireFactoryService{
  public $key: string;
  public nombre: string;
  public numero: string;
  public propiedad: string;

  constructor(){
    super();

    // this.$key=$key;
  }

  

}

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

