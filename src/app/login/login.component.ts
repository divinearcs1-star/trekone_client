import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private authservice: AuthService, private router: Router, private toastr: ToastrService) {
  }
  msg = ""
  loginUserData = {
    email: "",
    password: ""
  }
  loginUser() {
    this.authservice.loginUser(this.loginUserData).subscribe(
      res => {
        console.log("received token")
        console.log(res.token)
        localStorage.setItem('token', res.token);
        console.log("entering into special")
        this.router.navigate(['/special']);
      },
      err => {
        console.log(err)
        this.msg = err.error.message;
        ;
      }
    );
  }

  register() {
    console.log("calling register")
    this.router.navigate(['/register']);
  }
}
