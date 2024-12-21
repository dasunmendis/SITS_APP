import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetailsComponent } from '../user/details/details.component';
import { UpdateComponent } from '../user/update/update.component';
import { UserDetail } from '../shared/models/user-detail.model';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DetailsComponent, UpdateComponent],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export class DashboardComponent {
  constructor(private router: Router, public authService: AuthService  ) { }

  onLogout() {
    this.authService.clearToken();
    this.router.navigateByUrl('/signin');
  }
}
