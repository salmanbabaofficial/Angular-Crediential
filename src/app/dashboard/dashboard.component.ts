import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { LoginService } from '../Services/login.service';
import Swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  userData: any[] = [];

  constructor(private userService: UserService, private route: Router) {
    this.loadUserData();
  }
  educationList: string[] = ['Primary', 'Middle', 'Matric', 'Intermediate', 'Gradution', 'Master',];


  ngOnInit() {
    // jQuery code to show Bootstrap modal
    $(document).ready(function () {
      $("#editbtn").click(function () {
        $("#exampleModal").modal('show');
      });
    });
  }


  loadUserData() {
    this.userService.getUserDetails().subscribe(
      (data) => {
        this.userData = data;
      },
      (error) => {
        console.error('Error loading user data', error);
      }
    );
  }


  onSubmit(form: NgForm) {
    // console.log(form)
    const dataToSend = { ...form.value, id: form.value.userId };
    this.userService.editUserData(dataToSend).subscribe(
      (response) => {
        console.log("Update User Data Successfully", response);
        this.userData = response;
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User data updated successfully.',
        });
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

  deleteUser(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUserData(id).subscribe(
          (response) => {
            console.log("Update User List After Deleted User", response);
            this.userData = this.userData.filter(user => user.id !== id);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'User Deleted successfully.',
            });
          });
      }
    }
    );
  }


  navigateToEditPage(user: any) {
    console.log("data send", user);
    this.route.navigate(['/editUser'], { state: { userData: user } });
  }

  toggleEditMode(user: any) {
    user.editMode = !user.editMode;
  }

  updateUser(user: any) {
    this.userService.editUserData(user).subscribe(
      (response) => {
        console.log("Update User Data Successfully", response);
        this.userData = response;
      },
      (error) => {
        console.error("Error sending request", error);
      }
    );

  }

  cancelEdit(user: any) {
    user.editMode = false
  }


  saveAll() {
    this.userData.forEach(user => {
      if (user.editMode) {
        this.userService.editUserData(user).subscribe(
          (response) => {
            console.log("Update User Data Successfully", response);
            this.userData = response;
          },
          (error) => {
            console.error("Error sending request", error);
          }
        );
      }
    })
  }


  handleSignOut() {
    localStorage.removeItem("userToken");
    this.route.navigate(["/login"]).then(() => {
      window.location.reload();
    });
  }
}

