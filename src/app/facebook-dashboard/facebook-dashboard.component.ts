import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facebook-dashboard',
  templateUrl: './facebook-dashboard.component.html',
  styleUrl: './facebook-dashboard.component.css'
})
export class FacebookDashboardComponent {

  userData: any;

  constructor(private route: Router) { }

  ngOnInit() {

    this.userData = JSON.parse(sessionStorage.getItem("userFacebookData") || "");
    console.log('User Data from facebook:', this.userData);
    // const userDataString = sessionStorage.getItem('userFacebookData');
    // if (userDataString) {
    //   this.userData = JSON.parse(userDataString);
    //   console.log('User Data from facebook:', this.userData);
    // }
  }

  handleSignOut() {
    sessionStorage.removeItem('userFacebookData');
    this.route.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}
