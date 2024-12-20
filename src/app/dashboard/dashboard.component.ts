import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsComponent } from '../user/details/details.component';
import { UpdateComponent } from '../user/update/update.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DetailsComponent, UpdateComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
  constructor(private router: Router) { }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/signin');
  }
}
