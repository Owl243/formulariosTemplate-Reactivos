import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html'
})
export class ReactiveComponent {
  forma : FormGroup;

  constructor(private fb : FormBuilder,
              private validadores : ValidadoresService){
    this.forma = this.fb.group({
      nombre  : [''],
      apellido: [''],
      correo  : [''],
      numero  : [''],
      direccion : [''],
      ciudad: [''],
    })
    this.crearFormulario();
    this.cargarInfo();
  }
  crearFormulario(){
    this.forma = this.fb.group({
      nombre  : ['',[Validators.required, Validators.minLength(4)]],
      apellido: ['',[Validators.required, Validators.minLength(4), this.validadores.noHerrera]],
      correo  : ['',[Validators.required, Validators.pattern
                      ('[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      numero  : ['',[Validators.required,  Validators.pattern('^[0-9]{10}$') ]],
      direccion : this.fb.group({
        distrito: ['', Validators.required],
        ciudad : [ '',Validators.required],
      }),
      pasatiempos: this.fb.array([

      ])
    });
  }


  cargarInfo(){
    this.forma.reset({
      nombre  : "Iaan",
      apellido: "Alvarez",
      correo  : "iaan.nwn@gmail.com",
      numero  : "5516393091",
      direccion : {
        distrito: "Ecatepec de Morelos",
        ciudad: "Mexico",
      },
    })
  }

  agregarPasatiempo(){
    this.pasatiempos.push( this.fb.control(''))
  }
  borrarPasatiempo(i:number){
    this.pasatiempos.removeAt(i);
  }


  guardar(){
    if (this.forma.invalid){
      return Object.values(this.forma.controls).forEach(control => {
        if(control instanceof FormGroup){
          console.log(this.forma.value);
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
      control.markAsTouched();
    }
  });
  }
}
  get pasatiempos(){
    const pasatiempos = this.forma.get('pasatiempos');
    return this.forma.get('pasatiempos') as FormArray;
  }

  get nombreNoValido(): boolean {
    const nombreControl = this.forma.get('nombre');
    return nombreControl?.invalid === true && nombreControl?.touched === true;
  }
  get apellidoNoValido(): boolean {
    const apellidoControl = this.forma.get('apellido');
    return apellidoControl?.invalid === true && apellidoControl?.touched === true;
  }
  get correoNoValido(): boolean {
    const correoControl = this.forma.get('correo');
    return correoControl?.invalid === true && correoControl?.touched === true;
  }
  get numeroNoValido(): boolean {
    const numeroControl = this.forma.get('numero');
    return numeroControl?.invalid === true && numeroControl?.touched === true;
  }
  get distritoNoValido(): boolean {
    const distritoControl = this.forma.get('direccion.distrito');
    return distritoControl?.invalid === true && distritoControl?.touched === true;
  }
  get ciudadNoValido(): boolean {
    const ciudadControl = this.forma.get('direccion.ciudad');
    return ciudadControl?.invalid === true && ciudadControl?.touched === true;
  }
}
