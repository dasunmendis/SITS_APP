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

