// Snapshot version
// #docregion
import { Component, OnInit }      from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import { Moneda } from './moneda.model';
import { MonedaLisComponent } from './moneda-list.component';

// import { Hero, HeroService } from './hero.service';

@Component({
    templateUrl: 'app/moneda/moneda.component.html'
})
export class MonedaComponent implements OnInit  {
    formMonedas: FormGroup;
    monedas: Moneda;

    constructor(
        // private route: ActivatedRoute,
        // private router: Router,
        // private service: HeroService
    ) {
        this.monedas = new Moneda();
        console.log(this.monedas.itemsObs.subscribe(data => console.log(data)));
    }

    // #docregion snapshot
    ngOnInit() {

        this.formMonedas = this.monedas.buildForm(this.formMonedas);
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
