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
  showPassword: boolean = false;
  loginUserData = {
    email: "",
    password: ""
  }
  loginUser() {
    this.authservice.loginUser(this.loginUserData).subscribe(
      res => {
        console.log("received token")
        this.authservice.saveTokens(res.accessToken, res.refreshToken,res.role);
        console.log(res.accessToken)
        console.log(res.refreshToken)
        console.log(res.role)

        console.log("entering into special")
        this.router.navigate(['/special']);
      },
      err => {
        console.log(err)
        this.msg = err.error.message;
      }
    );
  }

  register() {
    console.log("calling register")
    this.router.navigate(['/register']);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
