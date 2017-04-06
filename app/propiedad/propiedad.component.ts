// Snapshot version
// #docregion
import {Component, OnInit}      from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Propiedad} from './propiedad.model';
import {Moneda} from '../moneda/moneda.model';
import {PropiedadLisComponent} from './propiedad-list.component';
import {General} from "../general/general.model";


@Component({
    templateUrl: 'app/propiedad/propiedad.component.html'
})
export class PropiedadComponent implements OnInit {
    formPropiedades: FormGroup;
    propiedades: Propiedad;
    monedas: Moneda;
    generales: General;

    constructor() {
        this.propiedades = new Propiedad();
        this.monedas = new Moneda();
        this.generales = new General();
        this.propiedades.join(['general']);
    }

    ngOnInit() {

        this.formPropiedades = this.propiedades.buildForm();

    }
}
