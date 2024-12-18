import { Component, OnInit} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../shared/user-detail.model';
import { UserDetailService } from '../shared/user-detail.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRegisterDialogComponent } from '../user-register-dialog/user-register-dialog.component';

@Component({
  selector: 'app-user-details',
  standalone: false,
  
  templateUrl: './user-details.component.html',
  styles: [
  ]
})
export class UserDetailsComponent {
  constructor(public service: UserDetailService, private toastr: ToastrService, private dialog: MatDialog) {
  }

  openAddRecordDialog(): void {
    this.dialog.open(UserRegisterDialogComponent, {
      width: '600px',
      data: {}
    });
  }

  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: UserDetail) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deleteUserDetail(id)
        .subscribe({
          next: res => {
            this.service.list = res as UserDetail[]
            this.toastr.error('Deleted successfully', 'User Detail Register')
          },
          error: err => { console.log(err) }
        })
  }
}
