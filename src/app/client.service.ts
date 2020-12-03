import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  // tslint:disable-next-line: typedef
  getRequest(route: string, token?: string) {
    // tslint:disable-next-line: prefer-const
    let config: any = {
      responseType: 'json',
      observe: 'response',
    };
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // tslint:disable-next-line: quotemark
      config[' headers '] = header;
    }
    console.log(config);

    return this.http.get(route, config);
  }

  // tslint:disable-next-line: typedef
  postRequest(route: string, data?: any, token?: string) {
    // tslint:disable-next-line: prefer-const
    let config: any = {
      responseType: 'json',
      observe: 'response',
    };

    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // tslint:disable-next-line: quotemark
      config[' header '] = header;
    }

    return this.http.post(route, data, config);
  }
  // tslint:disable-next-line: typedef
  putRequest(route: string, data?: any, token?: string) {
    // tslint:disable-next-line: prefer-const
    let config: any = {
      responseType: 'json',
      observe: 'response',
    };

    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // tslint:disable-next-line: quotemark
      config[' header '] = header;
    }

    return this.http.put(route, data, config);
  }
  // tslint:disable-next-line: typedef
  deleteRequest(route: string, token?: string) {
    // tslint:disable-next-line: prefer-const
    let config: any = {
      responseType: 'json',
      observe: 'response',
    };
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      // tslint:disable-next-line: quotemark
      config[' headers '] = header;
    }
    console.log(config);

    return this.http.get(route, config);
  }
}
