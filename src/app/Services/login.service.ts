import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import Swal from 'sweetalert2';

declare var FB: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  private loginUrl = environment.apiLogin;

  sendLoginData(data: { user_name: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginUrl, data);
  }


}
