import { Component, OnInit } from '@angular/core';
import {
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-register-room-admin',
  templateUrl: './register-room-admin.component.html',
  styleUrls: ['./register-room-admin.component.css'],
})
export class RegisterRoomAdminComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService,
    private fb2: FormBuilder
  ) {}
  submitted = false;
  listArticle = [];
  formulario: FormGroup;
  toast = true;
  formAmbiente: FormGroup;
  get inventario(): FormArray {
    return this.formulario.get('inventario') as FormArray;
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
        title: 'Registro exitoso',
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown',
        },
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: 'error',
        title: 'Upss algo salio mal!',
      });
    }
  }
  ngOnInit(): void {
    this.formAmbiente = this.fb2.group({
      nombreAmbiente: ['', Validators.required],
      numeroAmbiente: ['', Validators.required],
      estado: ['', Validators.required],
    });
    this.crearFormulario();
  }

  crearFormulario(): void {
    /* this.formulario = this.fb.group({
      inventario: this.fb.array([]),
    });*/
    this.formulario = this.fb.group({
      articulo: ['', Validators.required],
      cantidad: ['', Validators.required],
    });
  }

  deleteInventario(i): void {
    this.listArticle.splice(i, 1);
  }

  registroInventario(): void {
    try {
      // console.log(this.formulario.value);
      const data2 = this.listArticle;
      if (this.formAmbiente.valid) {
        // tslint:disable-next-line: max-line-length
        this.client
          .postRequest(
            `http://alertroomws.herokuapp.com/api/ambientes/registrar`,
            {
              id: this.formAmbiente.value.numeroAmbiente,
              nombre: this.formAmbiente.value.nombreAmbiente,
              estado: this.formAmbiente.value.estado,
              ocupado: 'N',
            }
          )
          .subscribe(
            (response: any) => {
              if (response.status === 200) {
                this.toast = true;
                this.notification();
              } else {
                this.toast = false;
                this.notification();
              }
              if (this.formAmbiente.value.numeroAmbiente && data2.length > 0) {
                this.client
                  .postRequest(
                    `http://alertroomws.herokuapp.com/api/inventario-ambiente/${this.formAmbiente.value.numeroAmbiente}`,
                    data2
                    // tslint:disable-next-line: no-shadowed-variable
                  )
                  // tslint:disable-next-line: no-shadowed-variable
                  .subscribe(
                    (response: any) => {
                      this.formAmbiente.reset();
                      this.formulario.reset();
                      this.listArticle = [];
                      console.log(this.listArticle);
                    },
                    // tslint:disable-next-line: no-unused-expression
                    (error) => {
                      if (error.status === 404) {
                        this.toast = false;
                        this.notification();
                      }
                    }
                  );
              }else{
              Swal.fire('se deben llenar el articulo y su cantidad');
              }
            },
            (err) => {
              Swal.fire('El numero de ambiente ya esta registrado');
            }
          );
        // tslint:disable-next-line: no-unused-expression
      } else {
        console.log('error en el form');
        Swal.fire({
        title: 'Recuerde llenar los campos obligatorios!',
        confirmButtonText: 'ok!',
        confirmButtonColor: 'rgb(252, 116, 5) ',
      });
      }
    } catch (error) {
      console.log('holas soy un error', error);
      this.toast = false;
      this.notification();
    }
  }
  addToArticle(): void {
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    } else {
      this.listArticle.push({
        nombre: this.formulario.value.articulo,
        cantidad: this.formulario.value.cantidad,
      });
    }

    this.formulario.reset();
  }
}
