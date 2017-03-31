import {NgModule}            from '@angular/core';
import {ReactiveFormsModule}        from '@angular/forms';
import {BrowserModule}    from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';



import {Routing} from './app.routes';
import {AppComponent}    from './app.component';
import {CoreModule}    from './core/core.module';
import {MonedasModule}    from './moneda/moneda.module';
import {testPipe}        from './shared/test.pipe';


@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        ReactiveFormsModule,
        Routing,
        CoreModule,
        MonedasModule,
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
    declarations: [AppComponent, testPipe],
    bootstrap: [AppComponent]

})
export class AppModule {
}