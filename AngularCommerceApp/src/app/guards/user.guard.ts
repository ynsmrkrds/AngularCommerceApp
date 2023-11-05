import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  if (window.sessionStorage.getItem("TOKEN_KEY") != null) {
    return true;
  } else {
    const router = inject(Router);
    return router.navigate(['login']);
  }
};
