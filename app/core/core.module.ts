// #docplaster
// #docregion
// #docregion v1
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}        from '@angular/forms';

import {NavComponent}    from './nav.component';
import {PaginationComponent}    from './pagination.component';
import {PaginationPipe}    from './pagination.pipe';
import {PaginationService}    from './pagination.service';
@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [
        NavComponent,
        PaginationComponent,
        PaginationPipe
    ],
    exports: [
        NavComponent,
        PaginationComponent,
        PaginationPipe
    ],
    providers: [
        PaginationService
    ]
})
export class CoreModule {
}
