// Snapshot version
// #docregion
import {Component, OnInit}      from '@angular/core';
import {Router} from '@angular/router';
// import { Hero, HeroService } from './hero.service';


@Component({
    selector: 'nav-component',
    templateUrl: 'app/core/nav.component.html'
})
export class NavComponent implements OnInit {
    // hero: Hero;

    routes: string[];
    titulo: string = '';


    constructor(private router: Router) {
        this.routes = ['monedas', 'propiedades', 'comodidades', 'servicios', 'principal'];

        this.router.events.subscribe(data=>{
            this.titulo = data['url'].replace('/','');
        })

    }

    isSelected(path) {
        // if(path === this.location.path()){
        //     return true;
        // }
        // else if(path.length > 0){
        //     return this.location.path().indexOf(path) > -1;
        // }
    }

    gotoDetail(link): void {
        // console.log('entra');
        // let link = ['/detail', hero.id];
        this.router.navigate([link]);
    }

    ngOnInit() {
        // (+) converts string 'id' to a number
        // let id = +this.route.snapshot.params['id'];

        // this.service.getHero(id)
        //     .then((hero: Hero) => this.hero = hero);
    }

}
