import { CanActivateFn,Router  } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authservice = inject(AuthService);
  const router = inject(Router);
  console.log('AuthGuard Executed');

  if(authservice.loggedIn()){
    console.log("token found");
    return true;
  }
  else{
    console.log("no token found");
    router.navigate(['/login'])
    return false;
  }

};
