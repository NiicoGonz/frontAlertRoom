import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
@Component({
  selector: 'app-register-user-admin',
  templateUrl: './register-user-admin.component.html',
  styleUrls: ['./register-user-admin.component.css'],
})
export class RegisterUserAdminComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}
  toast = true;
  form: FormGroup;
  // tslint:disable-next-line: variable-name
  img_register = './static/register.jpg';
  // tslint:disable-next-line: variable-name
  img_user_regis = './static/identification.svg';
  ngOnInit(): void {
    this.form = this.fb.group({
      rol: ['', Validators.required],
      identificacion: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', [Validators.required,Validators.email]],
      telefono: [''],
    });
  }
  notification(): void {
    if (this.toast) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
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
        title: 'Registro Exitoso',
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
        title: 'Fallo en el registro',
      });
    }
  }

  async onSubmit(): Promise<any> {
    console.log(this.form.valid);
    if (this.form.valid){
if (this.form.value.rol === 'Instructor') {
  this.form.value.rol = 'I';
  this.client
    .postRequest(
      'http://alertroomws.herokuapp.com/api/usuarios/registrarPersona',
      {
        id: this.form.value.identificacion,
        nombres: this.form.value.nombre,
        apellidos: this.form.value.apellido,
        email: this.form.value.email,
        contrasena: this.form.value.identificacion,
        estado: 'A',
        telefono: this.form.value.telefono,
        tipoUsuario: this.form.value.rol,
      }
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.toast = true;
          this.form.reset();
          this.notification();
        } else {
          this.toast = false;
          this.notification();
        }
      },
      // tslint:disable-next-line: no-unused-expression
      (err) => {
        console.log(err);
        this.toast = false;
        this.notification();
      }
    );
} else {
  this.form.value.rol = 'G';
  console.log(this.form.value);
  this.client
    .postRequest(
      'http://alertroomws.herokuapp.com/api/usuarios/registrarPersona',
      {
        id: this.form.value.identificacion,
        nombres: this.form.value.nombre,
        apellidos: this.form.value.apellido,
        email: this.form.value.email,
        contrasena: this.form.value.identificacion,
        estado: 'A',
        telefono: this.form.value.telefono,
        tipoUsuario: this.form.value.rol,
      }
    )
    .subscribe(
      (response: any) => {
        console.log(response);
        if (response.status === 200) {
          this.toast = true;
          this.form.reset();
          this.notification();
        } else {
          this.toast = false;
          this.notification();
        }
      },
      // tslint:disable-next-line: no-unused-expression
      (err) => {
        console.log(err);
        this.toast = false;
        this.notification();
      }
    );
}
    }else{
      Swal.fire({
        title: 'Recuerda completar todos los campos obligatorios.',
        width: 300,
        padding: '1em',
        confirmButtonColor: 'rgb(252, 116, 5) '
      });
    }
  }
}
