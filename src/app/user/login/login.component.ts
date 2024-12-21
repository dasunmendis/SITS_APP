import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent {
  constructor(
    //public formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService) {}

    private formBuilder = inject(FormBuilder);
    isSubmitted: boolean = false;

    form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    })
  
    hasDisplayableError(controlName: string): Boolean {
      const control = this.form.get(controlName);
      return Boolean(control?.invalid) &&
        (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    }
  
    // onSubmit() {
    //   this.isSubmitted = true;
    //   if (this.form.valid) {
    //     this.service.signin(this.form.value).subscribe({
    //       next: (res: any) => {
    //         localStorage.setItem('token', res.token);
    //         this.router.navigateByUrl('/dashboard');
    //       },
    //       error: err => {
    //         if (err.status == 400)
    //           this.toastr.error('Incorrect email or password.', 'Login failed')
    //         else
    //           console.log('error during login:\n', err);
  
    //       }
    //     })
    //   }
    // }

    onSubmit() {
      this.isSubmitted = true;
    
      if (this.form.valid) {
        this.authService.signin(this.form.value).subscribe({
          next: (res: any) => {
            if (res && res.token) { // Check if the response contains a token
              //localStorage.setItem('token', res.token);
              this.authService.storeToken(res.token);
              //console.log('token', res.token);
              this.toastr.success('Login successful', 'Welcome');
              this.router.navigateByUrl('/dashboard'); // Navigate to dashboard on success
            } else {
              this.toastr.error('Login failed. Please try again.', 'Error'); // Handle unexpected response structure
              this.router.navigateByUrl('/signin'); // Redirect to login page
            }
          },
          error: err => {
            if (err.status === 400) {
              this.toastr.error('Incorrect email or password.', 'Login Failed');
            } else {
              this.toastr.error('An unexpected error occurred. Please try again later.', 'Error');
              console.error('Error during signin:\n', err);
            }
            this.router.navigateByUrl('/signin'); // Redirect to login page on error
          }
        });
      } else {
        this.toastr.warning('Please fill in all required fields.', 'Validation Error');
      }
    }

}
