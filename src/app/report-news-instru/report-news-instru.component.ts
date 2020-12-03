import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-report-news-instru',
  templateUrl: './report-news-instru.component.html',
  styleUrls: ['./report-news-instru.component.css'],
})
export class ReportNewsInstruComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router
  ) {}
  validator = false;
  arrayNovedades: [];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  // tslint:disable-next-line: radix

  change(): void {
    if (this.validator === false) {
      this.validator = true;
    } else {
      this.validator = false;
    }
  }
  ngOnInit(): void {
    (this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
    }),
      (this.form = this.fb.group({
        idAmbiente: ['', Validators.required],
        observaciones: ['', Validators.required],
      })),
      this.getNovedades();
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    // tslint:disable-next-line: no-unused-expression
    this.dtTrigger;
  }

  getNovedades(): void {
    this.client
      .getRequest(
        'http://alertroomws.herokuapp.com/api/novedades/listarNovedades'
      )
      .subscribe((response: any) => {
        this.arrayNovedades = response.body;
        console.log(this.arrayNovedades);
        this.dtTrigger.next();
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error.status);
      };
  }
  solicitarNovedad(): void {
    const data = {
      idAmbiente: {
        id: this.form.value.idAmbiente,
      },
      idUsuario: {
        id: localStorage.getItem('idUser'),
      },
      concepto: {
        idConcepto: 6,
      },
      observaciones: this.form.value.observaciones,
    };
    console.log(data);
    this.client
      .postRequest(
        'http://alertroomws.herokuapp.com/api/solicitudes/solicitarNovedad',
          data
      )
      .subscribe(
        (response) => {
          console.log(response);
        },
        (error) => {
          console.log(error);
        });
  }
}
