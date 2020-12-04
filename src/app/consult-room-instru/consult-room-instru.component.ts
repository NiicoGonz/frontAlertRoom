import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-consult-room-instru',
  templateUrl: './consult-room-instru.component.html',
  styleUrls: ['./consult-room-instru.component.css'],
})
export class ConsultRoomInstruComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}
  form: FormGroup;
  inventario: [];
  validador;
  ngOnInit(): void {
    this.form = this.fb.group({
      numeroAmbiente: ['', Validators.required],
    });
  }
  toast = true;
  img_ambi = './static/ambi.jpg';
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
        title: 'consulta exitosa',
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
        title: 'Fallo en la consulta, reintente de nuevo',
      });
    }
  }
  getAmbiente() {
    if (this.form.valid) {
      this.client
        .getRequest(
          `http://alertroomws.herokuapp.com/api/ambientes/instructor-consultar/${this.form.value.numeroAmbiente}`
        )
        .subscribe(
          (response: any) => {
            console.log(response.body);
            this.inventario = response.body['listaInventarioAmbiente'];
            if (response.body['ocupado'] === 'N') {
              this.validador = true;
            }
          },
          // tslint:disable-next-line: no-unused-expression
          (error) => {
            this.toast = false;
            this.notification();
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
  solicitarLlaves() {
    const data = {
      idAmbiente: {
        id: this.form.value.numeroAmbiente,
      },
      idUsuario: {
        id: localStorage.getItem('idUser'),
      },
      concepto: {
        idConcepto: 1,
      },
      observaciones: 'solicito llaves',
    };
    this.client
      .postRequest(
        'http://alertroomws.herokuapp.com/api/solicitudes/solicitarllaves ',
        data
      )
      .subscribe(
        (response) => {
          console.log(response);
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
            title: 'Solicitud de llaves  exitosa',
          });
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
            icon: 'failed',
            title: 'ocurrio un error',
          });
        }
      );
  }
}
