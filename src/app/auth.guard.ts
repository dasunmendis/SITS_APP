import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './shared/services/auth.service'
//import { MatSnackBar } from '@angular/material/snack-bar'; 
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); 
  const router = inject(Router); 
  const toastr = inject(ToastrService);
  //const snackBar = inject(MatSnackBar)
  
  if (!authService.isAuthenticated()) { 
    if (state.url === '/dashboard') {
    //   snackBar.open('Access denied. Please log in to view the dashboard.', 'Close', {
    //     duration: 3000, // Duration of the message
    // });
    toastr.error('Please log in to view the dashboard.', 'Access Denied');
  }
    router.navigate(['/signin']); 
    return false; 
  } 
  
  return true;
};
