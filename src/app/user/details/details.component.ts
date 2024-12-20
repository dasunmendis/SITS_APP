import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../shared/models/user-detail.model';
import { UserService } from '../../shared/services/user.service';
//import { MatDialog } from '@angular/material/dialog';
//import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styles: [  ]
})
export class DetailsComponent {
  constructor(public service: UserService, private toastr: ToastrService) { }

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
