import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent {

  // Variable para formulario html
  forma: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.crearFomulario();
  }

  // Arreglo de elementos para formulario ---------------
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  // -----------------------------------------------------

  // Validaciones Formularios reactive
  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }

  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }

  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }

  get distritoNoValido() {
    return this.forma.get('direccion.distrito')?.invalid && this.forma.get('direccion.distrito')?.touched
  }

  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }



  // Funciones de formulario reactive
  crearFomulario() {
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, , Validators.minLength(4)]],
      apellido: ['', Validators.required],
      correo: [
        '',
        [
          Validators.required,
          Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
        ]
      ],
      direccion: this.fb.group({
        distrito: ['', Validators.required,],
        ciudad: ['', Validators.required,]
      }),
      pasatiempos: this.fb.array([]),

    });
  }

  guardarFormGroup() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }
    // Posteo de información
    this.forma.reset();
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control('')); // Validators.required
  }

  borrarPasatiempo(index :number) {
    this.pasatiempos.removeAt(index);
  }



}
