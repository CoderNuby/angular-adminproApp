import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.validateToken().pipe(tap(isAuth => {
    if(!isAuth){
      router.navigateByUrl("/login");
    }
  }));
};
