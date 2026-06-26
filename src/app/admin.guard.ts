import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const authservice = inject(AuthService);
  const router = inject(Router);

  console.log('admin guard Executed');
  const role = localStorage.getItem('role');

  if (role === 'admin') {
    console.log("role: ", role);
    return true;
  }
  else {
    console.log("not admin role");
    router.navigate(['/login'])
    return false;
  }
};
