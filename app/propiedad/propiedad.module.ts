import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}    from '@angular/forms';

import {PropiedadComponent}    from './propiedad.component';
import {PropiedadLisComponent}    from './propiedad-list.component';
import {SharedModule}    from '../shared/shared.module';
import {CoreModule}    from '../core/core.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        CoreModule,
    ],
    declarations: [
        PropiedadComponent,
        PropiedadLisComponent,
    ],
    exports: [PropiedadComponent, PropiedadLisComponent],
    providers: []
})
export class PropiedadesModule {
}