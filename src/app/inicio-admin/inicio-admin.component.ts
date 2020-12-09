import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../client.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-inicio-admin',
  templateUrl: './inicio-admin.component.html',
  styleUrls: ['./inicio-admin.component.css'],
})
export class InicioAdminComponent implements OnDestroy, OnInit {
  arrayNovedades: [];
  form: FormGroup;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  constructor(
    private fb: FormBuilder,
    private client: ClientService,
    public auth: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      initialDate: [''],
      finalDate: [''],
      numberAmbient: ['', Validators.required],
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json',
      },
    };
    this.getNovedades();
  }
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

  downloadPDF(): void{
      // Extraemos el
      const DATA = document.getElementById('htmlData');
      const doc = new jsPDF('p', 'pt', 'a4');
      const options = {
        background: 'white',
        scale: 3
      };
      html2canvas(DATA, options).then((canvas) => {
        const img = canvas.toDataURL('image/PNG');
        // Add image Canvas to PDF
        const bufferX = 15;
        const text = ' Información de novedades';
        const bufferY = 15;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
        return doc;
    }).then((docResult) => {
      docResult.save(`${new Date().toISOString()}_Novedades.pdf`);
    });
  }
}
