import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private route: Router, public auth: AuthService ) { }

  ngOnInit(): void {
  this.auth.escogerRol(localStorage.getItem('rol'));    
  }
  inicio(): void{
  this.route.navigate(['']);
  }
  gestionarusuarios(): void{
    this.route.navigate(['register-user-admin']);
  }
    img_footer = './static/logotipo.svg';

}