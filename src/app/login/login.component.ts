import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService,
  ) {}

  form: FormGroup;
  load = true;

  // tslint:disable-next-line: variable-name
  img_circle = './static/usuario.svg';
  // tslint:disable-next-line: variable-name
  img_identification = './static/identification.svg';
  // tslint:disable-next-line: variable-name
  img_password = './static/user-regis.svg';

  // tslint:disable-next-line: typedef
  ngOnInit() {
    this.form = this.fb.group({
      identification: ['', Validators.required],
      password: ['', Validators.required],
    });
    const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer);
          toast.addEventListener('mouseleave', Swal.resumeTimer);
        },
      });

    Toast.fire({
        icon: 'info',
        title: 'Hola bienvenido, inicia sesion para continuar',
      });
  }

  // tslint:disable-next-line: typedef
  async onSubmit() {
    try {
        if (this.form.valid) {
          this.load = false;
          console.log(this.form.value.password);
          
          this.client
            .postRequest(
              'https://alertroomws.herokuapp.com/api/usuarios/login',
              {
                id: this.form.value.identification,
                contrasena: this.form.value.password,
              }
            )
            .subscribe(
              (response: any) => {
                this.load = true;
                const { tipoUsuario, nombres , id} = response.body;
                this.auth.login(tipoUsuario);
                this.auth.setCourrentUser(nombres);
                localStorage.setItem('idUser', id);
                this.httpHandlerResponse.protocol(response);
              },
              // tslint:disable-next-line: no-unused-expression
              (err) => {
                this.load = true;
                this.httpHandlerResponse.protocol(err);
              }
            );
        } else {
          console.log('Form error');
          Swal.fire({
             icon: 'error',
             title:
               'Parece que no completaste el formulario. Llena los campos ',
             showConfirmButton: false,
             timer: 2500,
           });
        }
    } catch (error) {
    }
  }
}

