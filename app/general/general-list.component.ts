// Snapshot version
// #docregion
import { Component, OnInit, EventEmitter, Input, Output }      from '@angular/core';

import { General } from './general.model';

// import { Hero, HeroService } from './hero.service';

@Component({
    selector: 'general-list-component',
    templateUrl: 'app/general/general-list.component.html'
})
export class GeneralLisComponent implements OnInit {
    @Input() generales: General;
    // @Output() ret = new EventEmitter<any>();

    constructor(// private route: ActivatedRoute,
                // private router: Router,
                // private service: HeroService
    ) {

        // console.log(this.generales.items);
    }


    ngOnInit() {
        // this.generales = new General();
    }

}
