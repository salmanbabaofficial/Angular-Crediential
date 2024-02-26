import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'; // Assuming SweetAlert2 is correctly imported
import { Login } from '../Model/login';
import { LoginService } from '../Services/login.service';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData = new Login('salman', '12121212');
  user!: SocialUser;

  constructor(
    private route: Router,
    private loginService: LoginService,
    private authService: SocialAuthService,
    private http: HttpClient
  ) {
    this.initGoogleSignIn();
  }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log("User State", user)
      if (user) {
        // this.getFacebookData();
        sessionStorage.setItem('userFacebookData', JSON.stringify(user));
      }
    });
  }

  initGoogleSignIn() {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then(user => {
        this.route.navigate(['/facebookDashboard']);
        this.user = user;
      })
      .catch(error => {
        console.error('Error occurred while logging in:', error);
        // Display error message to the user or handle it appropriately
      });
  }


  // getFacebookData() {
  //   if (this.user) {
  //     const accessToken = this.user.authToken;
  //     this.http.get(`https://graph.facebook.com/me?fields=id,name,public_profile&access_token=${accessToken}`)
  //       .subscribe((userFacebookData: any) => {
  //         sessionStorage.setItem('userData', JSON.stringify(userFacebookData));
  //       }, error => {
  //         console.error('Error fetching user data from Facebook:', error);
  //       });
  //   }
  // }

  onSubmit(form: any) {
    if (form.valid) {
      console.log("You are redirecting on Dashboard");
      this.loginService.sendLoginData(form.value).subscribe(
        (response: any) => {
          const token = response.access_token;
          if (token) {
            localStorage.setItem('userToken', token);
            form.resetForm();
            this.route.navigate(['/dashboard']);
          }
        },
        (error) => {
          console.error('Login error:', error);
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password. Please try again.',
          });
        }
      );
    } else {
      console.log("Something is wrong. Please check input fields.");
    }
  }

  navigateToSignup() {
    console.log("Navigating to signup page");
    this.route.navigate(['/signup']);
  }
}
