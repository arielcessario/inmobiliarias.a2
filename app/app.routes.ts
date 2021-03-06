import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MonedaComponent}   from './moneda/moneda.component';
import {PropiedadComponent}   from './propiedad/propiedad.component';
// import { DashboardComponent }   from './dashboard.component';
// import { HeroesComponent }      from './heroes.component';
// import { HeroDetailComponent }  from './hero-detail.component';

const routes: Routes = [
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {path: 'monedas', component: MonedaComponent},
    {path: 'propiedades', component: PropiedadComponent},
    // { path: 'detail/:id', component: HeroDetailComponent },
    // { path: 'heroes',     component: HeroesComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class Routing {
}
// export const routedComponents = [MonedaComponent];