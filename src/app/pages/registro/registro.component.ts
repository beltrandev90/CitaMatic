import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AlertController } from '@ionic/angular';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NegocioService } from 'src/app/services/negocio.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {

  ionicForm!: FormGroup;
  submitted = false;
  registros: any;

  negocio = {
    nombre: '',
    email: '',
    password: ''
  };
  confirmPassword = '';
  passwordMismatch = false;

  constructor(
    private http: HttpClient, 
    private router: Router,
    public negocioService: NegocioService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) {
    this.ionicForm = this.formBuilder.group({
      nombre: new FormControl("", Validators.required),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl("", Validators.required)
    }, {
      validators: this.mustMatch('password', 'confirmPassword')
    });
  }

  get f() {
    return this.ionicForm.controls;
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const passwordControl = formGroup.controls[password];
      const confirmPasswordControl = formGroup.controls[confirmPassword];

      // No establecer errores si hay otros errores de validación
      if (confirmPasswordControl.errors && !confirmPasswordControl.errors['mustMatch']) {
        return;
      }

      // Establecer o eliminar el error 'mustMatch'
      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ mustMatch: true });
      } else {
        confirmPasswordControl.setErrors(null);
      }
    };
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
  
  enviarDatos() {
    console.log('Enviando datos:', this.ionicForm.value);
  
    this.submitted = true;
  
    if (this.ionicForm.invalid) {
      console.log('Formulario no válido. Deteniendo envío de datos.');
      return;
    }

    // Validar si los passwords coinciden
    this.passwordMismatch = this.f['password'].value !== this.f['confirmPassword'].value;

    if (this.passwordMismatch) {
      return;
    }
  
    this.negocioService.registroNegocio(this.ionicForm.value).subscribe(
      (ans) => {
        console.log('Respuesta del servidor:', ans);
  
        this.registros = ans;
  
        console.log('Datos de registros:', this.registros['data']);
        console.log('Texto de registros:', this.registros['texto']);
        console.log('Authorized de registros:', this.registros['authorized']);
  
        if (this.registros['authorized'] === 'NO') {
          console.log('Mostrando alerta de error...');
          // Llama al método mostrarAlertaNO con el mensaje específico
          this.mostrarAlertaNO('Error', 'Email ya registrado');
        } else {
          console.log('Mostrando alerta de éxito...');
          // Llama al método mostrarAlertaOK con el mensaje específico
          this.mostrarAlertaOK('Enhorabuena', 'Usuario creado correctamente');
        }
      },
      (error) => {
        console.error('Error en la solicitud:', error);
        console.log('Mostrando alerta de error en la solicitud...');
        // En caso de un error en la solicitud, muestra una alerta de error genérica
        this.mostrarAlertaNO('Error', 'Email ya registrado');
      }
    );
  }
  
  async mostrarAlertaOK(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: [{
        text: 'OK',
        handler: () => {
          window.location.href = '/login';
        }
      }],
      cssClass: 'custom-alert-header'
    });
  
    await alert.present();
  }
  
  async mostrarAlertaNO(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK'],
      cssClass: 'custom-alert-header'
    });
  
    await alert.present();
  }
}
function uuidv4() {
  throw new Error('Function not implemented.');
}

