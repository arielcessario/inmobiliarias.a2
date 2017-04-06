import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PropiedadComponent } from './propiedad.component';
// import { HeroesComponent } from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/propiedad',
    //     pathMatch: 'full'
    // },
    {
        path: 'propiedad',
        component: PropiedadComponent
    },
    // {
    //     path: 'detail/:id',
    //     component: HeroDetailComponent
    // },
    // {
    //     path: 'heroes',
    //     component: HeroesComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PropiedadRoutingModule { }

export const routedComponents = [PropiedadComponent];