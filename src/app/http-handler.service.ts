import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Injectable({
  providedIn: 'root',
})
export class HttpHandlerService {
  constructor(private route: Router) {}
  // tslint:disable-next-line: typedef
  protocol(response) {
    console.log('estoy en el handler', response);
    switch (response.status) {
      case 200:
        console.log('estoy en el caso 200');
        Swal.fire({
          icon: 'success',
          title: 'Logueado con exito',
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          if (response.body.tipoUsuario === 'A') {
            console.log('voy para admin');
            this.route.navigate(['/inicioAdmin']);
          }
          if (response.body.tipoUsuario === 'G') {
            console.log('voy para guardan');
            this.route.navigate(['/inicioSegurityG']);
          }
          if (response.body.tipoUsuario === 'I') {
            this.route.navigate(['/inicioInstru']);
          }
        });
        break;
      case 404:
        Swal.fire({
          icon: 'error',
          title: 'Upps no se ha podido loguear, verifica usuario y contraseña',
          showConfirmButton: false,
          timer: 2500,
        });
        this.route.navigate(['']);

        break;
      case 101:
        Swal.fire('Todo esta correcto');
        break;
      case 201:
        Swal.fire('su solicitud fue creada');
        break;
      case 500:
        console.log('entre al 400');
        break;
      default:
        break;
    }
  }
}
