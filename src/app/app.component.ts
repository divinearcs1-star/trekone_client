import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private router: Router, public authservice: AuthService) {
    this.router.events.subscribe((event: any) => {
      if (event.url) {
        // console.log(event.url);
      }
    });
  }
  isMenuOpen = false;

  isAdmin() {
    return localStorage.getItem('role') === 'admin';
  }
  isUser(){
    return localStorage.getItem('role') === 'user';
  }

}
