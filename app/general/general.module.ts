// #docplaster
// #docregion
// #docregion v1
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}    from '@angular/forms';

import {GeneralComponent}    from './general.component';
import {GeneralLisComponent}    from './general-list.component';
// import { GeneralRoutingModule }    from './general-routes.module';

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
        // GeneralRoutingModule
// #enddocregion v1
//         HeroRoutingModule
// #docregion v1
    ],
    declarations: [
        GeneralComponent,
        GeneralLisComponent,
        // HeroDetailComponent
    ],
    exports: [GeneralComponent, GeneralLisComponent],
    providers: [
        // HeroService
    ]
})
export class GeneralesModule {
}