import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const _router = inject(Router);
    const _authService = inject(AuthService);
    const isAuthenticated: any = _authService.isAuthenticated();

    if (isAuthenticated) {
        return true;
    } else {
        _router.navigate(['/login']);
        return false;
    }
};