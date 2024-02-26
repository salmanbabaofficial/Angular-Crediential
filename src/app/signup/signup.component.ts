import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormGroup, NgForm } from '@angular/forms';
import { SignupService } from '../Services/signup.service';
import { User } from '../Model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  constructor( private route: Router, private signupService:SignupService){}

  // userData = new User('', '', '','','', '');
  userData = new User('salman', 'abc@gmail.com', '12121212','12121212','male', 'Gradution');
  educationList: string[] = ['Primary','Middle','Matric','Intermediate','Gradution','Master',];

 ngOnInit() {}

  onSubmit(form: NgForm) {
    if (form.valid) { 
      console.log(form.value);
      this.signupService.sendSignupData(form.value).subscribe(
        (response: any) => {
          console.log('Data sent successfully', response);
          Swal.fire({
            title: "Thank you!",
            text: "Congratulations, your account has been successfully created.",
            icon: "success"
          });
          form.resetForm();
          this.userData.education = '';
          this.route.navigate(['/login']);
        },
        (_error: any) => {
          Swal.fire({
            icon: 'error',
            title: 'Signup Failed',
            text: 'Error creating account. Please try again.',
          });
          form.resetForm();
        }
      );
    } else {
      console.log("Something is wrong. Please check input fields.");
    }
  }
  
  navigateToLogin() {
    console.log("Navigating to login page");
    this.route.navigate(['/login']);
  }

}

