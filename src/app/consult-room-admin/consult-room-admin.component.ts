import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-consult-room-admin',
  templateUrl: './consult-room-admin.component.html',
  styleUrls: ['./consult-room-admin.component.css'],
})
export class ConsultRoomAdminComponent implements OnInit {
  consultar: FormGroup;
  constructor(
    private fb: FormBuilder,
    private fb2: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}
  toast = true;

  arrayAmbiente;
  arrayObjetos;
  nombreAmbiente;
  numeroAmbiente;
  estado;
  ngOnInit(): void {
    this.consultar = this.fb.group({
      numero: ['', Validators.required],
    });
  
    this.getAmbientes();
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
  getAmbiente(): void {
    console.log(this.consultar.value);
    if (this.consultar.valid) {
      this.client
        .getRequest(
          `http://alertroomws.herokuapp.com/api/ambientes/consultar/${this.consultar.value.numero}`
        )
        .subscribe((response: any) => {
          this.toast = true;
          this.arrayAmbiente = response.body['listaInventarioAmbiente'];
          this.arrayObjetos = response.body.listaInventarioAmbiente;
          this.estado = response.body.estado;
          console.log(this.estado);
          this.nombreAmbiente = response.body.nombre;
          if (response.body.estado === 'A') {
            this.estado = 'Activo';
          }
          this.numeroAmbiente = response.body.id;
          this.notification();
        },
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          if (error.status === 404) {
            this.toast = false;
            this.notification();
          }
        });
    }else{
       Swal.fire({
         title: 'Recuerde llenar los campos obligatorios!',
         confirmButtonText: 'ok!',
         confirmButtonColor: 'rgb(252, 116, 5) ',
       });
    }
  }
  getAmbientes(): void{
       this.client
         .getRequest(
           `http://alertroomws.herokuapp.com/api/ambientes/listar`
         )
         .subscribe(
           (response: any) => {
             console.log(response.body);
           },
           // tslint:disable-next-line: no-unused-expression
           (error) => {
             if (error.status === 404) {
             }
           }
         );
  }

}
