import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm!: FormGroup;
  submitted = false;
  recordarDatos = false;

  constructor(
    public userLogin: LoginService,
    public formBuilder: FormBuilder,
    public alertController: AlertController,
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      recordarDatos: [false] // valor por defecto del checkbox
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  get errorControl() {
    return this.loginForm.controls;
  }

  alert(event: any) {
    console.log(event.target);
  
    // Obtener datos del formulario
    const datos = {
      email: event.target.email,
      password: event.target.password
    };
  
    console.log('Datos del formulario:', datos); // Agregar este log para verificar los datos
    
    // Asignar el valor del checkbox a la propiedad recordarDatos
    this.recordarDatos = this.loginForm.controls['recordarDatos'].value;
  
    // Validaciones
    this.submitted = true;
  
    // Detenerse aquí si el formulario no es válido
    if (this.loginForm.invalid) {
      return;
    }
  
    // En lugar de mostrar la alerta, enviar los datos al servicio
    this.enviarDatos();
  }
  
  enviarDatos() {
    this.userLogin.loginUser(this.loginForm.value).subscribe(
      (negocio: any) => {
        if (negocio && negocio.data && negocio.data.length > 0 && negocio.data[0].email) {
          // Almacena los datos del negocio en localStorage
          this.userLogin.storeNegocio(negocio.data[0]);
  
          if (this.recordarDatos) {
            localStorage.setItem('negocio', JSON.stringify(this.loginForm.value));
          }
  
          console.log('Negocio almacenado en localStorage:', localStorage.getItem('negocio'));
          window.location.href = '/home';
        } else {
          this.presentAlert('Error', 'Negocio o contraseña incorrectos');
        }
      },
      (error: any) => {
        console.error('Error al obtener el negocio:', error);
        this.presentAlert('Error', 'Negocio o contraseña incorrectos');
      }
    );
  }

  async presentAlert(header: string, message: string) {
    console.log('Mostrando alerta:', header, message); // Agrega este log para ver si se llama correctamente
  
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}