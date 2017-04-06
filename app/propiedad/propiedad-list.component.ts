// Snapshot version
// #docregion
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';

import { Propiedad } from './propiedad.model';

// import { Hero, HeroService } from './hero.service';

@Component({
    selector: 'propiedad-list-component',
    templateUrl: 'app/propiedad/propiedad-list.component.html'
})
export class PropiedadLisComponent implements OnInit {
    @Input() propiedades: Propiedad;
    // @Output() ret = new EventEmitter<any>();

    constructor(// private route: ActivatedRoute,
                // private router: Router,
                // private service: HeroService
    ) {

        // console.log(this.propiedades.items);
    }


    ngOnInit() {
        // this.propiedades = new Propiedad();
    }

}
