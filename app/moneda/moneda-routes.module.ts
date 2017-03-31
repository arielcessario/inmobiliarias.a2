import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonedaComponent } from './moneda.component';
// import { HeroesComponent } from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/moneda',
    //     pathMatch: 'full'
    // },
    {
        path: 'moneda',
        component: MonedaComponent
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
export class MonedaRoutingModule { }

export const routedComponents = [MonedaComponent];