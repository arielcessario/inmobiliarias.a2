import {NgModule}            from '@angular/core';
import {ReactiveFormsModule}        from '@angular/forms';
import {BrowserModule}    from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';

import {Routing} from './app.routes';
import {AppComponent}    from './app.component';
import {CoreModule}    from './core/core.module';
import {MonedasModule}    from './moneda/moneda.module';
import {PropiedadesModule}    from './propiedad/propiedad.module';
import {GeneralesModule}    from './general/general.module';
import {OtrosModule}    from './otro/otro.module';
import {SharedModule}    from './shared/shared.module';
import {PaginationService} from "./core/pagination.service";


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        Routing,
        MonedasModule,
        PropiedadesModule,
        GeneralesModule,
        OtrosModule,
        SharedModule,
        CoreModule,
        AngularFireModule.initializeApp({
                apiKey: "AIzaSyAbx0mKlgtt4k7qRxTgcmvbJyHD6GjOFDU",
                authDomain: "inmobiliarias.firebaseapp.com",
                databaseURL: "https://inmobiliarias.firebaseio.com",
                storageBucket: "firebase-inmobiliarias.appspot.com"
            },
            {
                provider: AuthProviders.Facebook,
                method: AuthMethods.Redirect
            }),
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    providers: [PaginationService]

})
export class AppModule {
}