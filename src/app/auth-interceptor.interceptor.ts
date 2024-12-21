import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core'; 
import { AuthService } from './shared/services/auth.service';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Inject the AuthService to get the token
  const token = authService.getToken(); // Get the token from the AuthService

  // Clone the request and add the Authorization header 
  const authReq = req.clone({ 
    setHeaders: { 
      Authorization: `Bearer ${token}` 
    } 
  });

  // Pass the cloned request instead of the original request to the next handler 
  return next(authReq);
};

