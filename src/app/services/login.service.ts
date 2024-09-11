import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_RUTA = "http://localhost/CitaMatic/APICITAMATIC/public/";
  RUTA_LOGIN = "Login"

  constructor(private http: HttpClient) { }

  storeNegocio(negocio: any) {
    localStorage.setItem('negocio', JSON.stringify(negocio));
  }

  loginUser(datos: any) {
    console.log(datos);
  
    const payload = new HttpParams()
      .set('email', datos.email)
      .set('password', datos.password);
  
    return this.http.post(this.BASE_RUTA + this.RUTA_LOGIN, payload).pipe(
      map((response: any) => {
        console.log('Respuesta del servidor:', response);
  
        if (response && response.email && response.id_negocio) {
          // Almacena los datos del negocio en localStorage
          localStorage.setItem('negocio', JSON.stringify(response));
  
          // Devuelve la respuesta del servidor
          return response;
        } else {
          // Si no, devolvemos una cadena vacía.
          return response;
        }
      }),
      catchError((error: any) => {
        console.error('Error al obtener los datos del negocio:', error);
        return of(''); // Devolvemos una cadena vacía en caso de error.
      })
    );
  }
  
}  
