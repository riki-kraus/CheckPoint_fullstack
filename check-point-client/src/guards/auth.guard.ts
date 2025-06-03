import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth-service.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authServiceService=inject(AuthService)
  return localStorage.getItem("token") !== null 
};

