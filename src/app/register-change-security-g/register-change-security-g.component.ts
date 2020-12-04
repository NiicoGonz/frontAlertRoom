import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';

@Component({
  selector: 'app-register-change-security-g',
  templateUrl: './register-change-security-g.component.html',
  styleUrls: ['./register-change-security-g.component.css'],
})
export class RegisterChangeSecurityGComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}

  toast = true;
  ambiente = localStorage.getItem('ambiente');
  instru = localStorage.getItem('instru');
  user = localStorage.getItem('idUser');
  form: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      observaciones: ['', Validators.required],
    });
  }
  notification(): void {
    if (this.toast) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'success',
        title: 'Se registro la novedad con exito',
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'error',
        title: 'fallo en el registro',
      });
    }
  }
  async registrarNovedad() {
    const data = {
      idAmbiente: {
        id: this.ambiente,
      },
      idUsuarioInstructor: {
        id: this.instru,
      },
      idUsuarioGuarda: {
        id: this.user,
      },
      observaciones: this.form.value.observaciones,
    };
    this.client
      .postRequest(
        'http://alertroomws.herokuapp.com/api/novedades/registrarNovedad',
        data
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.toast = true;
            this.notification();
            localStorage.removeItem('instru');
            localStorage.removeItem('ambiente');
            this.finalizarNovedad();
            localStorage.removeItem('ambiente');
            localStorage.removeItem('instru');
            localStorage.removeItem('idSolicitud');
            this.form.reset();


          }
        },
        (error) => {
          this.toast = false;
          this.notification();
        }
      );
  }
  finalizarNovedad(): void {
    const idSolicitud = localStorage.getItem('idSolicitud');
    this.client
      .getRequest(
        `http://alertroomws.herokuapp.com/api/solicitudes/actualizarSolicitud/${idSolicitud}`
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
