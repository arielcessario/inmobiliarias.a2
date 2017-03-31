// #docplaster
// #docregion
// #docregion v1
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}    from '@angular/forms';

import {MonedaComponent}    from './moneda.component';
import {MonedaLisComponent}    from './moneda-list.component';
// import { MonedaRoutingModule }    from './moneda-routes.module';

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
        // MonedaRoutingModule
// #enddocregion v1
//         HeroRoutingModule
// #docregion v1
    ],
    declarations: [
        MonedaComponent,
        MonedaLisComponent,
        // HeroDetailComponent
    ],
    exports: [MonedaComponent, MonedaLisComponent],
    providers: [
        // HeroService
    ]
})
export class MonedasModule {
}