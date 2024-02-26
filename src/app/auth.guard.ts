import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private route: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    const token = localStorage.getItem('userToken');
    if (token) {
      return true;
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized Access',
        text: 'Please login first.',
      });
      this.route.navigate(['/login']);
      return false
    }

  }
}