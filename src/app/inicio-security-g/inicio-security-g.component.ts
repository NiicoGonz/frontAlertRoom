import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpHandlerService } from '../http-handler.service';

@Component({
  selector: 'app-inicio-security-g',
  templateUrl: './inicio-security-g.component.html',
  styleUrls: ['./inicio-security-g.component.css'],
})
export class InicioSecurityGComponent implements OnInit {
  arrayLlaves: [];
  arrayNovedades: [];
  listaNovedades: [];
  atender = false;
  validadorLlaves = false;
  validadorNovedades = false;
  novedades6;;
  constructor(
    private client: ClientService,
    public auth: AuthService,
    private route: Router,
    private httpHandlerResponse: HttpHandlerService
  ) {}

  ngOnInit(): void {
    this.getSolicitudLlaves();
  }
  getSolicitudLlaves(): void {
    this.client
      .getRequest(
        'http://alertroomws.herokuapp.com/api/solicitudes/listarSolicitudes'
      )
      .subscribe((response: any) => {
        this.arrayLlaves = response.body;
        if (this.arrayLlaves.length <= 0) {
          this.validadorLlaves = true;
        }
        this.getSolicitudNovedades();
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error);
      };
  }
  getSolicitudNovedades(): void {
    this.client
      .getRequest(
        'http://alertroomws.herokuapp.com/api/solicitudes/listarNovedades'
      )
      .subscribe((response: any) => {
        this.arrayNovedades = response.body;
        console.log(this.arrayNovedades);
        this.novedades6 = this.arrayNovedades.filter(
          (x) => x['concepto']['idConcepto'] === 6
        );
        if (this.novedades6.length <= 0) {
            this.validadorNovedades = true;
          }
        console.log(this.novedades6);
        // tslint:disable-next-line: prefer-for-of
      }),
      // tslint:disable-next-line: no-unused-expression
      (error) => {
        console.log(error);
      };
  }
  atenderNovedad(item: any): void {
    console.log(item);
    localStorage.setItem('instru', item.idUsuario.id);
    localStorage.setItem('ambiente', item.idAmbiente.id);
    localStorage.setItem('idSolicitud', item.idSolicitud);
    this.atender = true;
  }
  finalizarNovedad(item : any): void {
       localStorage.setItem('instru', item.idUsuario.id);
       localStorage.setItem('ambiente', item.idAmbiente.id);
       localStorage.setItem('idSolicitud', item.idSolicitud);
       const idSolicitud = localStorage.getItem('idSolicitud');
       this.atender = false;
       this.client
      .getRequest(
        ` http://alertroomws.herokuapp.com/api/solicitudes/atenderSolicitud/${idSolicitud}`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.getSolicitudNovedades();
        },
        (error) => {
          console.log(error);
        }
      );
  }
  entregarLlavesInstru(item: any): void {
    const idLlavesAmbiente = localStorage.setItem('idLlaves', item.idSolicitud);
    const idSolicitud = localStorage.getItem('idLlaves');
    this.client
      .getRequest(
        `http://alertroomws.herokuapp.com/api/solicitudes/entregaLlavesInstructor/${idSolicitud}`
      )
      .subscribe(
        (response) => {
          console.log(response);
          this.ngOnInit();
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
