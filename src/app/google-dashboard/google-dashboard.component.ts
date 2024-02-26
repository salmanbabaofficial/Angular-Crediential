import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-google-dashboard',
  templateUrl: './google-dashboard.component.html',
  styleUrl: './google-dashboard.component.css'
})
export class GoogleDashboardComponent implements OnInit {

  userProfile: any;
  constructor(private route: Router) { }

  ngOnInit() {
    this.userProfile = JSON.parse(sessionStorage.getItem("loggedInUser") || "");
    console.log('User Data from facebook:', this.userProfile);
  }

  handleSignOut() {
    sessionStorage.removeItem("loggedInUser");
    this.route.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}
