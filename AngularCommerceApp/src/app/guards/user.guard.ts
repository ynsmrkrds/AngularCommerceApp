import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {UserService} from '../services/user.service';

export const userGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if (userService.isAuthenticated()) {
    const userRole = userService.getUserRole();

    if (userRole === 'Admin' && route.routeConfig?.path != 'admin/users') {
      return router.navigate(['admin/users']);
    }

    return true;
  } else {
    return router.navigate(['login']);
  }
};
