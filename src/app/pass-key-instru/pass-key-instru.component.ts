import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import { async } from '@angular/core/testing';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-pass-key-instru',
  templateUrl: './pass-key-instru.component.html',
  styleUrls: ['./pass-key-instru.component.css'],
})
export class PassKeyInstruComponent implements OnInit {
  form: FormGroup;
  img_pasar = './static/pasar.jpg';
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      idInstru: ['', Validators.required],
      idAmbiente: ['', Validators.required],
    });
  }
  // tslint:disable-next-line: typedef
  async onSubmit() {
    if (this.form.valid) {
      const data = {
        idUsuario: {
          id: this.form.value.idInstru,
        },
        idAmbiente: {
          id: this.form.value.idAmbiente,
        },
      };
      const idUser = localStorage.getItem('idUser');
      this.client
        .postRequest(
          `http://alertroomws.herokuapp.com/api/solicitudes/rotacion/${idUser}`,
          data
        )
        .subscribe(
          (response: any) => {
            console.log(response);
            if (response.status === 200) {
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
                title: 'llaves rotadas con exito',
              });
            }
          },
          (error) => {
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
              title: 'ocurrio un error ',
            });
          }
        );
    }else{
          Swal.fire({
            title: 'Recuerde rellenar los campos obligatorios!',
            confirmButtonText: 'ok!',
            confirmButtonColor: 'rgb(252, 116, 5) ',
          });
    }
  }
}
