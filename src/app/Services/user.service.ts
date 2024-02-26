import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environment/environment';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = environment.apiUser;
  private deleteUrl = environment.apiDelete;
  // private editUrl = environment.apiEdit;
  private editUrl = 'http://localhost:3000/edit';

  constructor(private http:HttpClient, private route:Router){}

  getUserDetails(): Observable<any>{
  const token =  localStorage.getItem("userToken")
    if(!token){
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please login first ',
      });
      this.route.navigate(['/login']);
    throw new Error('Invalid User')
    }
    const headers = ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(`${this.userUrl}` , {headers});
  }
 
  deleteUserData(id: number): Observable<any> {
    const token = localStorage.getItem('userToken');
      if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please login first ',
      });
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<any>(`${this.deleteUrl}/${id}`, { headers });
  }
  
  editUserData(data: any): Observable<any> {
    const token = localStorage.getItem('userToken');
    if (!token) {
      
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please login first',
      });
    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
 
    return this.http.patch<any>(this.editUrl, data, { headers });
  }
  
}