import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserService } from '../../shared/services/user.service';
import { UserDetail } from '../../shared/models/user-detail.model';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update.component.html',
  styles: [],
  providers: [DatePipe]
})
export class UpdateComponent {
  constructor(public service: UserService, private toastr: ToastrService, public datePipe: DatePipe) {
  }

  // // Model property
  // service = {
  //   formData: {
  //     id: '',
  //     firstName: '',
  //     email: '',
  //     gender: '',
  //     dateOfBirth: ''
  //   },
  //   formSubmitted: false
  // };

  imagePreview: string | ArrayBuffer | null = null; // For image preview

  onImageSelect(event: Event): void {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.service.formData.image = file;

      // Generate a preview of the image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // formatDate(value: string) {
  //   if (value) {
  //     const formattedDate = this.datePipe.transform(value, 'dd/MM/yyyy'); 
  //     this.service.formData.dateOfBirth = formattedDate || value; 
  //   }
  // }

  formatDate(event: string) {
    if (event) {
      // Attempt to parse the input and format as 'dd/MM/yyyy'
      const parsedDate = new Date(event);
      if (!isNaN(parsedDate.getTime())) {
        this.service.formData.dateOfBirth = this.datePipe.transform(parsedDate, 'dd/MM/yyyy') || '';
      } else {
        // Handle invalid date input if needed
        console.error('Invalid date format');
      }
    }
  }

  // onSubmit(form: NgForm) {
  //   this.service.formSubmitted = true
  //   if (form.valid) {
  //     if (this.service.formData.id == 0)
  //       this.insertRecord(form)
  //     else
  //       this.updateRecord(form)
  //   } 
  // }

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true;
    if(form.valid && form.dirty) {
      this.updateRecord(form)
    } else {
      this.toastr.error("Sorry, No value changes detected.", "Submit Failed.")
    }
  }

  insertRecord(form: NgForm) {
    this.service.postUserDetail()
      .subscribe({
        next: res => {
          this.service.list = res as UserDetail[]
          this.service.resetForm(form)
          this.toastr.success('Inserted successfully', 'User Detail Register')
        },
        error: err => { console.log(err) }
      })
  }

  updateRecord(form: NgForm) {
    console.log('Submitting updated data:', this.service.putUserDetail); // Debugging
    this.service.putUserDetail()
      .subscribe({
        next: res => {
          console.log('API Response:', res); // Debugging
          this.service.list = res as UserDetail[]
          this.service.resetForm(form)
          this.toastr.info('Updated successfully', 'User Detail Register')
        },
        error: err => { 
          console.error('API Error:', err); // Log full error for debugging
          if (err.status === 400) {
            this.toastr.error('Bad request: Please check the submitted data.', 'Update Failed');
          } else {
            this.toastr.error('An unexpected error occurred.', 'Update Failed');
          }
        }
      });
   }

}
