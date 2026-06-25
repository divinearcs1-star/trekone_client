import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  token = '';
  showPassword = false;

  strength = 'Weak';
  strengthClass = 'weak';

  hasLength = false;
  hasUppercase = false;
  hasLowercase = false;
  hasNumber = false;
  hasSpecialChar = false;

  MForm!: FormGroup;

  constructor(
    private FB: FormBuilder,
    private route: ActivatedRoute,
    private authservice: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('token')!;

    this.MForm = this.FB.group({
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>]+$'), Validators.minLength(8)]]
    });
  }

  resetPassword() {
    if (this.MForm.invalid) {
      this.MForm.markAllAsTouched();
      return;
    }

    const password = this.MForm.get('password')?.value;

    this.authservice.resetPassword(this.token, password).subscribe(
      (res: any) => {
        console.log(res);
        if (res.status === 'warning') {
          this.toastr.warning(res.message);
        } else {
          this.toastr.success(res.message);
        }
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
        this.toastr.error(err.error.message);
      }
    );
  }

  checkPasswordStrength() {
    const password = this.MForm.get('password')?.value || '';

    this.hasLength = password.length >= 8;
    this.hasUppercase = /[A-Z]/.test(password);
    this.hasLowercase = /[a-z]/.test(password);
    this.hasNumber = /[0-9]/.test(password);
    this.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    let score = 0;

    if (this.hasLength) score++;
    if (this.hasUppercase) score++;
    if (this.hasLowercase) score++;
    if (this.hasNumber) score++;
    if (this.hasSpecialChar) score++;

    if (score <= 2) {
      this.strength = 'Weak';
      this.strengthClass = 'weak';
    } else if (score <= 4) {
      this.strength = 'Medium';
      this.strengthClass = 'medium';
    } else {
      this.strength = 'Strong';
      this.strengthClass = 'strong';
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
