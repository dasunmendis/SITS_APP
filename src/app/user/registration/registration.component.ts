import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstKeyPipe } from '../../shared/pipes/first-key.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FirstKeyPipe, RouterLink],
  templateUrl: './registration.component.html',
  styles: ``
})
export class RegistrationComponent {
  constructor(
    //public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService) { }

  private formBuilder = inject(FormBuilder);
  isSubmitted: boolean = false;

passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password')
    const confirmPassword = control.get('confirmPassword')

    if (password && confirmPassword && password.value != confirmPassword.value)
      confirmPassword?.setErrors({ passwordMismatch: true })
    else
      confirmPassword?.setErrors(null)

    return null;
  }

  form = this.formBuilder.group({
    firstName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)]],
    confirmPassword: [''],
    remark: ['', Validators.required],
    title: [''],
    lastName: [''],
    dateOfBirth: [new Date().toISOString().substring(0, 10)],
    gender: [''],
  }, { validators: this.passwordMatchValidator })

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.valid) {
      console.log('Submitting form data:', this.form.value); // Debugging
      this.service.createUser(this.form.value)
        .subscribe({
          next: (res: any) => {
            console.log("Response:", res);
            if (res.flag) {
              this.form.reset();
              this.isSubmitted = false;
              this.toastr.success('New user created!', 'Registration Successful')
            } else {
              console.log('Unexpected response:', res);
              this.toastr.error('Unexpected response from server.', 'Registration Failed');
            }
          },
          error: err => {
            console.error('API error:', err); // Log the full error for debugging
            if (err.error.errors)
              err.error.errors.forEach((x: any) => {
                switch (x.code) {
                  case "DuplicateUserName":
                    this.toastr.error('Username is already taken.', 'Registration Failed');
                    break;
                  case "DuplicateEmail":
                    this.toastr.error('Email is already taken.', 'Registration Failed')
                    break;
                  default:
                    console.log('Unhandled error code:', x);
                    this.toastr.error('Contact the developer', 'Registration Failed')
                    break;
                }
              });
            else {
              console.log('error:',err);
              this.toastr.error('Unexpected error occurred.', 'Registration Failed');
            }
          }
        });
    } else {
      console.log('Form validation errors:', this.form.errors);
      this.toastr.error('Form is invalid. Please correct the errors.', 'Submission Failed');
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched)|| Boolean(control?.dirty))
  }

}
