import { Component, OnInit, OnDestroy} from '@angular/core';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
@Component({
  selector: 'app-consult-change-security-g',
  templateUrl: './consult-change-security-g.component.html',
  styleUrls: ['./consult-change-security-g.component.css'],
})
export class ConsultChangeSecurityGComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  arrayNovedades;
  constructor(private client: ClientService, public auth: AuthService) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
    };
    this.getUsuarios();
  }
  ngOnDestroy(): void {
    this.dtTrigger;
  }
  descripcion(item: any): void {
    console.log(item);
    const { value: formValues } = Swal.fire({
      title: 'Información',
       backdrop: `
    rgba(0,0,123,0.4)
    left top
    no-repeat
  `,
      html:
        '<label> Nombre Instructor' +
        `<input disabled  id="swal-input1" class="swal2-input" value="${item.idUsuarioInstructor.nombres}">` +
        '<label> Documento Instructor' +
        `<input disabled  id="swal-input2" class="swal2-input" value="${item.idUsuarioInstructor.id}">` +
        '<label> Nombre Guarda' +
        `<input disabled  id="swal-input3" class="swal2-input" value="${item.idUsuarioGuarda.nombres}">` +
        '<label> Documento Guarda' +
        `<input disabled  id="swal-input4" class="swal2-input" value="${item.idUsuarioGuarda.id}">`,

      focusConfirm: false,
      showConfirmButton: true
    });

    if (formValues) {
      Swal.fire(JSON.stringify(formValues));
    }
  }
  getUsuarios(): void {
    this.client
      .getRequest(
        'http://alertroomws.herokuapp.com/api/novedades/listarNovedades'
      )
      .subscribe((response: any) => {
        console.log(response.body);
        this.arrayNovedades = response.body;
        this.dtTrigger.next();
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error.status);
      };
  }
}
