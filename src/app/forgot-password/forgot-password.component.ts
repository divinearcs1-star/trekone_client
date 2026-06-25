import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  email = '';
  constructor(private authservice: AuthService, private toastr: ToastrService) {

  }

  submit() {
    this.authservice.forgotPassword(this.email).subscribe(
      (res: any) => {
        console.log(res);
        this.toastr.success(res.message);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }
}
