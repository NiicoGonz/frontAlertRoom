import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-consult-user-admin',
  templateUrl: './consult-user-admin.component.html',
  styleUrls: ['./consult-user-admin.component.css'],
})
export class ConsultUserAdminComponent implements OnDestroy, OnInit {
  dtOptions: any = {};
  dtTrigger = new Subject();
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}
  form: FormGroup;
  arrayUser;
  ngOnInit(): void {
    (this.form = this.fb.group({
      document: ['', Validators.required],
    })),
      (this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 5,
        language: {
          url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
        },
        paging: true,
        searching: true,
        retrieve: true,
         buttons: [
        'pdfHtml5'
    ]
      });
    this.getUsuarios();
  }
  ngOnDestroy(): void {
    this.dtTrigger;
  }
  getUsuarios(): void {
    this.client
      .getRequest(
        'http://alertroomws.herokuapp.com/api/usuarios/listarUsuarios'
      )
      .subscribe((response: any) => {
        this.arrayUser = response.body;
        console.log(this.arrayUser);
        this.dtTrigger.next();
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error.status);
      };
  }
  getUsuario(): void {
    
    this.client
      .getRequest(
        `http://alertroomws.herokuapp.com/api/usuarios/${this.form.value.document}`
      )
      .subscribe((response: any) => {
        console.log(response.body);
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error.status);
      };
  }
  updateEstado(i: any): void {
    this.client
      .putRequest(
        `http://alertroomws.herokuapp.com/api/usuarios/actualizarEstado/${i}`
      )
      .subscribe(
        (response: any) => {
          console.log(response);
          this.ngOnDestroy();
          this.getUsuarios();
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
