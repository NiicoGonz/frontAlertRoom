import { Component, OnInit, OnDestroy} from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-consult-info-room-security-g',
  templateUrl: './consult-info-room-security-g.component.html',
  styleUrls: ['./consult-info-room-security-g.component.css'],
})
export class ConsultInfoRoomSecurityGComponent implements OnDestroy, OnInit {
  toast = true;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  arraySolicitudes;
  checkID=false;
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}

  ngOnInit(): void {
     this.dtOptions = {
       pagingType: 'full_numbers',
       pageLength: 5,
       language: {
         url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
       },
        retrieve: true

     };
    this.getSolicitudes();
  }
  ngOnDestroy(): void {
    this.dtTrigger;
  }
  notification(): void {
    if (this.toast) {
      const Toast = Swal.mixin({
        toast: true,
        position: 'bottom',
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
        title: 'Tienes solicitudes',
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
        title: 'failed in successfully',
      });
    }
  }
  getSolicitudes(): void {
    this.client
      .getRequest(
        'http://alertroomws.herokuapp.com/api/solicitudes/listarSolicitudesAmbiente'
      )
      .subscribe((response: any) => {
        console.log(response.body);
        this.arraySolicitudes = response.body;
        if (this.arraySolicitudes.length > 0) {
          this.notification();
        }
        this.dtTrigger.next();
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error);
      };
  }
  getLlaves(i: any): void{
     this.client
       .getRequest(
         `http://alertroomws.herokuapp.com/api/solicitudes/devolverLlavesGuarda/${i}`
       )
       .subscribe((response: any) => {
         if (response.status === 200) {
           this.notification();
         }
         this.dtTrigger.next();
         this.getSolicitudes();
       }),
       // tslint:disable-next-line: no-unused-expression
       (error) => {
         console.log(error);
       };
  }
}
