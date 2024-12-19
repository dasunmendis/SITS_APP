import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { UserDetailService } from '../../shared/user-detail.service';
import { UserDetail } from '../../shared/user-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-detail-form',
  standalone: false,
  
  templateUrl: './user-detail-form.component.html',
  styles: [
  ]
})
export class UserDetailFormComponent {
  constructor(public service: UserDetailService, private toastr: ToastrService) {
  }

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

  onSubmit(form: NgForm) {
    this.service.formSubmitted = true
    if (form.valid) {
      if (this.service.formData.id == 0)
        this.insertRecord(form)
      else
        this.updateRecord(form)
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
    this.service.putUserDetail()
      .subscribe({
        next: res => {
          this.service.list = res as UserDetail[]
          this.service.resetForm(form)
          this.toastr.info('Updated successfully', 'User Detail Register')
        },
        error: err => { console.log(err) }
      })
   }

}

