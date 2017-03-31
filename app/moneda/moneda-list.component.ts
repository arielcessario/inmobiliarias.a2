// Snapshot version
// #docregion
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';

import { Moneda } from './moneda.model';

// import { Hero, HeroService } from './hero.service';

@Component({
    selector: 'moneda-list-component',
    templateUrl: 'app/moneda/moneda-list.component.html'
})
export class MonedaLisComponent implements OnInit {
    @Input() monedas: Moneda;
    // @Output() ret = new EventEmitter<any>();

    constructor(// private route: ActivatedRoute,
                // private router: Router,
                // private service: HeroService
    ) {

        // console.log(this.monedas.items);
    }


    ngOnInit() {
        // this.monedas = new Moneda();
    }

}
