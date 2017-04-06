// #docplaster
// #docregion
// #docregion v1
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}    from '@angular/forms';

import {PropiedadComponent}    from './propiedad.component';
import {PropiedadLisComponent}    from './propiedad-list.component';
// import { PropiedadRoutingModule }    from './propiedad-routes.module';

// import { HeroListComponent }    from './hero-list.component';
// import { HeroDetailComponent }  from './hero-detail.component';
//
// import { HeroService } from './hero.service';

// #enddocregion v1
// import { HeroRoutingModule } from './heroes-routing.module';

// #docregion v1
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        // PropiedadRoutingModule
// #enddocregion v1
//         HeroRoutingModule
// #docregion v1
    ],
    declarations: [
        PropiedadComponent,
        PropiedadLisComponent,
        // HeroDetailComponent
    ],
    exports: [PropiedadComponent, PropiedadLisComponent],
    providers: [
        // HeroService
    ]
})
export class PropiedadesModule {
}