import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent {
  constructor(
    private authService: AuthService
  ) {}

  logOut() {
    this.authService.logOut();
  }
}
