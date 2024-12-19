import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NgForm } from "@angular/forms";
import { UserDetailService } from '../shared/user-detail.service';

@Component({
  selector: 'app-user-register-dialog',
  standalone: false,
  
  templateUrl: './user-register-dialog.component.html',
  styles: [ ],
})

export class UserRegisterDialogComponent {
  service = { 
    formData: {
      id: 0,
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      remark: "",
      gender: "",
      dateOfBirth: "",
      image: null as File | null,
    },
  };

  constructor(public dialogRef: MatDialogRef<UserRegisterDialogComponent>,private dataService: UserDetailService) {}

  imagePreview: string | ArrayBuffer | null = null;

  // onImageSelect(event: Event): void {
  //   const input = event.target as HTMLInputElement;

  //   if (input.files && input.files[0]) {
  //     const file = input.files[0];
  //     this.service.formData.image = file;

  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       this.imagePreview = reader.result;
  //     };
  //     reader.readAsDataURL(file);
  //   }
  // }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.service.formData.image = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  // onSubmit(form: any) {
  //   if (form.valid) {
  //     console.log('Form Data:', this.service.formData);
  //     this.dialogRef.close(this.service.formData);
  //   }
  // }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const formData = new FormData();
      formData.append('id', this.service.formData.id.toString());
      formData.append('title', this.service.formData.title);
      formData.append('firstName', this.service.formData.firstName);
      formData.append('lastName', this.service.formData.lastName);
      formData.append('email', this.service.formData.email);
      formData.append('password', this.service.formData.password);
      formData.append('remark', this.service.formData.remark);
      formData.append('gender', this.service.formData.gender);
      formData.append('dateOfBirth', this.service.formData.dateOfBirth);
      if (this.service.formData.image) {
        formData.append('image', this.service.formData.image);
      }

      this.dataService.addRecord(formData).subscribe(
        (response) => {
          console.log('Record added successfully:', response);
          this.dialogRef.close(true); // Close the dialog and pass success flag
        },
        (error) => {
          console.error('Error adding record:', error);
        }
      );
    }
  }

}
