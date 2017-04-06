import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GeneralComponent } from './general.component';
// import { HeroesComponent } from './heroes.component';
// import { HeroDetailComponent } from './hero-detail.component';

const routes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/general',
    //     pathMatch: 'full'
    // },
    {
        path: 'general',
        component: GeneralComponent
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
export class GeneralRoutingModule { }

export const routedComponents = [GeneralComponent];