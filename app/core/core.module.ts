// #docplaster
// #docregion
// #docregion v1
import {NgModule}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import {ReactiveFormsModule}        from '@angular/forms';

import {SharedModule} from "../shared/shared.module";

import {NavComponent}    from './nav.component';

import {PaginationComponent}    from './pagination.component';
import {PaginationPipe}    from './pagination.pipe';
import {PaginationService}    from './pagination.service';

import {AutocompleteComponent}    from './autocomplete.component';
import {AutocompleteService}    from './autocomplete.service';
import {WaitingComponent}    from './waiting.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReactiveFormsModule,
    ],
    declarations: [
        NavComponent,
        PaginationComponent,
        PaginationPipe,
        AutocompleteComponent,
        WaitingComponent
    ],
    exports: [
        NavComponent,
        PaginationComponent,
        PaginationPipe,
        AutocompleteComponent,
        WaitingComponent
    ],
    providers: [
        PaginationService,
        AutocompleteService,
    ]
})
export class CoreModule {
}
