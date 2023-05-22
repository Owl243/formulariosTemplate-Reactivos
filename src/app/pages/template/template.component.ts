import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html'
})
export class TemplateComponent {
  constructor ( private pais :PaisService){
    this.pais.getPaises().subscribe(paises =>{
      this.paises = paises;
      this.paises.unshift({
        nombre: '[ Seleccione Pais ]',
        codigo: ''
      })
      console.log(this.paises)
    })
  }

  usuario = {
    nombre: 'Iaan',
    apellido:'Alvarez',
    correo: 'iaan.nwn@gmail.com',
    pais: 'MEX'
  }
  paises : any [] = [];

  guardar(forma : NgForm){
    if (forma.invalid){
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
    }else{
      console.log(forma.value);
    }
  }
}
