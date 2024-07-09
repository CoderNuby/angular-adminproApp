import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserModel } from '../../models/user.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``
})
export class HeaderComponent implements OnInit {

  user!: UserModel;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  search(keyWord: string) {
    if(keyWord.length === 0) {
      this.router.navigateByUrl("/pages");
      return;
    }
    this.router.navigateByUrl(`/pages/search/${keyWord}`);
  }

  ngOnInit(): void {
    this.user = this.authService.user;
  }

  logOut() {
    this.authService.logOut();
  }
}
