import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../Services/user.service';
import Swal from 'sweetalert2';
import {  ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent implements OnInit {

  user: any;

  educationList: string[] = ['Primary','Middle','Matric','Intermediate','Gradution','Master',];
 
  constructor(private route: Router, private userService:UserService , private activeRoute : ActivatedRoute) {

   }

   ngOnInit() {
    this.user = history.state.userData;
    console.log("Received data:", this.user);
  }

  onSubmit(form: NgForm) {
    // console.log(form)
    const dataToSend = { ...form.value, id: form.value.userId};
    this.userService.editUserData(dataToSend).subscribe(
      (response) => {
        console.log("Update User Data Successfully", response);
        this.user = response;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User data updated successfully.',
        });
        this.route.navigate(['dashboard'])
      },
      (error) => {
        console.error("Error sending request", error);
        Swal.fire({
          icon: 'error',
          title: 'Request Failed',
          text: 'There was an error while processing your request.',
        });
      }
    );
  }
    
 
}
