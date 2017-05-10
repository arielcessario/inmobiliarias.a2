
import {Component, OnInit, EventEmitter, Input, Output}      from '@angular/core';
import {Propiedad} from './propiedad.model';

// import { Hero, HeroService } from './hero.service';

@Component({
    selector: 'propiedad-list-component',
    templateUrl: 'app/propiedad/propiedad-list.component.html'
})
export class PropiedadLisComponent implements OnInit {
    @Input() propiedades: Propiedad;
    start: number;
    propiedades_arr: Array<any>;
    // @Output() ret = new EventEmitter<any>();

    constructor(// private route: ActivatedRoute,
        // private router: Router,
        // private service: HeroService
    ) {

        // console.log(this.propiedades.items);
    }


    ngOnInit() {

        this.start = 0;
        this.propiedades.get().subscribe(data=>{
            this.propiedades_arr = data;
        });
        // this.propiedades = new Propiedad();
    }
    countChange(event){
        this.start = event;
    }

}
