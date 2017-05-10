// Snapshot version
// #docregion
import {Component, OnInit}      from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

import {Propiedad} from './propiedad.model';
import {Moneda} from '../moneda/moneda.model';
import {Otro} from '../otro/otro.model';
import {PropiedadLisComponent} from './propiedad-list.component';
import {General} from "../general/general.model";


@Component({
    templateUrl: 'app/propiedad/propiedad.component.html'
})
export class PropiedadComponent implements OnInit {
    formPropiedades: FormGroup;
    propiedades: Propiedad;
    monedas: Moneda;
    monedas_arr: Array<any>;
    generales: General;
    otros: Otro;
    prueba: Array<any> = [
        {id: 1, desc: 'alalalal'},
        {id: 2, desc: 'alalalal'},
        {id: 3, desc: 'alalalal'},
        {id: 4, desc: 'alalalal'},
        {id: 5, desc: 'alalalal'},
        ];



    constructor() {
        this.propiedades = new Propiedad();
        this.monedas = new Moneda();
        this.generales = new General();
        this.otros = new Otro();
        this.propiedades.join(['general']);
    }

    ngOnInit() {

        this.formPropiedades = this.propiedades.buildForm();
        this.monedas.get().subscribe(data=>{
            this.monedas_arr = data;
        });

    }

    getId(event){
        console.log(event);
    }
}
