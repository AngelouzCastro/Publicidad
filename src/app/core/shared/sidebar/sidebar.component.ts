import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidebar',
  imports: [
    MatIconModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  _authService = inject(AuthService);
  _router = inject(Router);

  logout() {
    this._authService.logOut().then(() => {
      this._router.navigate(['/login']);
    }).catch((error) => console.log(error));
  }
}
