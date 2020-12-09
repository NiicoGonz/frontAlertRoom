import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}
  toast = true;
  validador = false;
  verificador = false;
  form: FormGroup;
  id: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  contraseña: string;
  estado: string;
  tipoUsuario: string;
  // tslint:disable-next-line: variable-name
  img_footer = './static/logotipo.svg';
  // tslint:disable-next-line: variable-name
  img_profile = './static/profile.jpg';
  elector = localStorage.getItem('rol');
  ngOnInit(): void {
    this.form = this.fb.group({
      identificacion: ['', Validators.required],
      nombre: ['',],
      apellido: ['', ],
      email: ['', ],
      telefono: ['', Validators.email],
      contraseña: ['', ],
    });
    this.guia();
  }
  guia(): void {
    if (this.elector === 'A') {
      Swal.mixin({
        confirmButtonText: 'Siguiente  &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4'],
      })
        .queue([
          {
            title: `Pasos para la actualizacion de datos`,
          },
          'Escribe en el campo identificacion el N° de identificacion de la persona que deseas consultar',
          'Presiona en el boton consultar y espera a que la informacion aparezca',
          'ahora en los campos que se requieran cambia los datos y pulsa el boton actualizar',
        ])
        .then((result) => {
          Swal.fire({
            title: 'Todo listo!',
            confirmButtonText: 'Lovely!',
            confirmButtonColor: 'rgb(252, 116, 5) ',
          });
        });
    } else {
      Swal.mixin({
        confirmButtonText: 'Siguiente  &rarr;',
        showCancelButton: true,
        progressSteps: ['1', '2', '3', '4'],
      })
        .queue([
          {
            title: `Pasos para la actualizacion de datos`,
          },
          'Escribe en el campo identificacion el N° de identificacion      ',
          'Presiona en el boton consultar y espera a qu  e la informacion aparezca',
          'ahora en los campos que se requieran cambia los datos y pulsa el boton actualizar',
        ])
        .then((result) => {
          Swal.fire({
            title: 'Todo listo!',
            confirmButtonText: 'Lovely!',
            confirmButtonColor: 'rgb(252, 116, 5) ',
          });
        });
    }
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
        title: 'Datos actualizados',
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
        title: 'Fallo en la actualizacion',
      });
    }
  }

  getUsuario(): void {
    console.log(this.verificador);
    if (this.form.valid) {
      this.client
        .getRequest(
          `http://alertroomws.herokuapp.com/api/usuarios/${this.form.value.identificacion}`
        )
        .subscribe((response: any) => {
          console.log(response);
          const {
            id,
            nombres,
            apellidos,
            email,
            estado,
            contrasena,
            telefono,
            tipoUsuario,
          } = response.body;
          this.nombres = nombres;
          this.apellidos = apellidos;
          this.email = email;
          this.telefono = telefono;
          this.tipoUsuario = tipoUsuario;
          this.contraseña = contrasena;
          this.estado = estado;
          this.validador = true;
          this.verificador = true;
          console.log(
            id,
            nombres,
            apellidos,
            email,
            contrasena,
            telefono,
            tipoUsuario,
            estado
          );
        }),
        // tslint:disable-next-line: no-unused-expression
        (error) => {
          console.log(error.status);
        };
    } else {
      Swal.fire({
        title: 'Recuerde que el campo documento es obligatorio!',
        confirmButtonText: 'ok!',
        confirmButtonColor: 'rgb(252, 116, 5) ',
      });
    }
  }
  putUser(): void {
    // tslint:disable-next-line: triple-equals
    if (this.form.valid && this.form.value.contraseña === '') {
      this.client
        .putRequest(
          `http://alertroomws.herokuapp.com/api/usuarios/${this.form.value.identificacion}`,
          {
            id: this.form.value.identificacion,
            nombres: this.form.value.nombre,
            apellidos: this.form.value.apellido,
            email: this.form.value.email,
            contrasena: this.contraseña,
            estado: this.estado,
            telefono: this.form.value.telefono,
            tipoUsuario: this.tipoUsuario,
          }
        )
        .subscribe(
          (response: any) => {
            this.toast = true;
            this.notification();
            this.verificador = false;
            this.form.reset();
          },
          (error) => {
            this.verificador = false;
          }
        );
    } else {
      console.log(this.form.value.contraseña);
      this.client
        .putRequest(
          `http://alertroomws.herokuapp.com/api/usuarios/${this.form.value.identificacion}`,
          {
            id: this.form.value.identificacion,
            nombres: this.form.value.nombre,
            apellidos: this.form.value.apellido,
            email: this.form.value.email,
            contrasena: this.form.value.contraseña,
            estado: this.estado,
            telefono: this.form.value.telefono,
            tipoUsuario: this.tipoUsuario,
          }
        )
        .subscribe(
          (response: any) => {
            this.toast = true;
            this.notification();
            this.verificador = false;
            this.form.reset();
          },
          (error) => {
            this.verificador = false;
          }
        );
    }
    if (this.form.valid !== true) {
      this.toast = false;
      this.notification();
    }
  }
  updateEstado(): void {
    this.client
      .putRequest(
        `http://alertroomws.herokuapp.com/api/usuarios/actualizarEstado/${this.form.value.identificacion}`
      )
      .subscribe(
        (response: any) => {
          this.toast = true;
          this.notification();
          this.getUsuario();
          this.form.reset();
        },
        (err) => {
          this.toast = false;
          this.notification();
        }
      );
  }
}
