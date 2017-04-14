// Snapshot version
// #docregion
import { Component, OnInit }      from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { General } from './general.model';
import { Moneda } from '../moneda/moneda.model';
import { GeneralLisComponent } from './general-list.component';

// import { Hero, HeroService } from './hero.service';

@Component({
    templateUrl: 'app/general/general.component.html'
})
export class GeneralComponent implements OnInit  {
    formGenerales: FormGroup;
    generales: General;
    monedas: Moneda;

    constructor(
        // private route: ActivatedRoute,
        // private router: Router,
        // private service: HeroService
    ) {
        this.generales = new General();
        this.monedas = new Moneda();
        this.monedas.join(['general']);
        //console.log(this.generales.itemsObs.subscribe(data => console.log(data)));
    }

    // #docregion snapshot
    ngOnInit() {

        this.formGenerales = this.generales.buildForm();
        // (+) converts string 'id' to a number
        // let id = +this.route.snapshot.params['id'];

        // this.service.getHero(id)
        //     .then((hero: Hero) => this.hero = hero);
    }
    // #enddocregion snapshot

    gotoHeroes() {
        // this.router.navigate(['/heroes']);
    }
}
