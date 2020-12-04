import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminGuard } from './admin/admin.guard';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // el BehaviorSubject que nos permitirá guardar el estado de login
  // tendrá un estado inicial booleano según lo que retorne checkToken
  isLogin = new BehaviorSubject<boolean>(this.checkToken());

  admin = new BehaviorSubject<boolean>(null);
  guard = new BehaviorSubject<boolean>(null);
  instructor = new BehaviorSubject<boolean>(null);

  // método que nos permitirá chequear si existe un token, en tal
  // caso retornará true
  public checkToken(): boolean {
    return !!localStorage.getItem('rol');
  }

  // método que nos permite establecer el token en el almacenamiento local
  // y enviar una señal al BehaviorSubject para establecer su nuevo valor en
  // true para indicar que estamos logueados
  login(rol: string): void {
    localStorage.setItem('rol', rol);
    console.log(`soy el rol del authService ${rol}`);
    this.escogerRol(rol);
  }

  escogerRol(rol: string): void {
    if (localStorage.getItem('rol') === 'G') {
      this.guard.next(true);
    } else if (localStorage.getItem('rol') === 'I') {
      this.instructor.next(true);
    } else if (localStorage.getItem('rol') === 'A') {
      console.log('soy un admin');
      this.admin.next(true);
      this.guard.next(false);
    } else {
      this.isLogin.next(false);
    }
  }

  // método que nos permite establecer el nombre del usuario
  // en el BehaviorSubject userName
  setCourrentUser(Nombres: string): void {
    localStorage.setItem('courrentUser', Nombres);
  }

  // método que nos permite recuperar el nombre del usuario
  // del BehaviorSubject userName
  getCourrentUser(): string {
    return localStorage.getItem('courrentUser');
  }

  // método que nos permite eliminar el nombre de usuario
  // del BehaviorSubject userName
  private deleteCourrentUser(): void {
    localStorage.removeItem('courrentUser');
  }

  // método que nos permite romover el token almacenado y el nombre del
  // usuario actual y enviar una señal al BehaviorSubject para establecer
  // su nuevo valor, en este caso false para indicar que no estamos logueados
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    localStorage.removeItem('idUser');
    localStorage.removeItem('idSolicitud');
    localStorage.removeItem('idLlaves');
    this.deleteCourrentUser();
    this.isLogin.next(false);
    this.admin.next(false);
    this.guard.next(false);
    this.instructor.next(false);
  }

  // método que nos retorna el BehaviorSubject cómo un observable
  isLoggedIn(): Observable<boolean> {
    return this.isLogin.asObservable();
  }

  // método que nos retorna el BehaviorSubject cómo un observable
  isAdmin(): Observable<boolean> {
    return this.admin.asObservable();
  }

  // método que nos retorna el BehaviorSubject cómo un observable
  isGuard(): Observable<boolean> {
    return this.guard.asObservable();
  }

  // método que nos retorna el BehaviorSubject cómo un observable
  isInstructor(): Observable<boolean> {
    return this.instructor.asObservable();
  }
}
