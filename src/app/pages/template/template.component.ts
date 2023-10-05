import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent {
  usuario = { nombre: '', apellido: '', correo: '@example.com' };

  guardar(forma: NgForm) {


    if (forma.invalid) {
      Object.values(forma.controls).forEach(control =>{
        console.log(control)
        control.markAsTouched();
      });
    }

    console.log(forma);
    console.log(forma.value);
  }
}
