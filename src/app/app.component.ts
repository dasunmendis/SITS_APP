import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegisterDialogComponent } from './user-register-dialog/user-register-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styles: []
})
export class AppComponent {
  title = 'SITS_APP';

  constructor(private dialog: MatDialog) {}

  openAddRecordDialog() {
    const dialogRef = this.dialog.open(UserRegisterDialogComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((success) => {
      if (success) {
        console.log('New record added successfully!');
        // Optionally refresh the data or handle post-submission logic
      }
    });
  }
}
