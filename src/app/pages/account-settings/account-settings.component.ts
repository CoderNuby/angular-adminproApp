import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {
  
  themeLink = document.querySelector("#theme");

  themeSelected: string = "";

  constructor(
    private settingsService: SettingsService
  ) {

  }

  ngOnInit(): void {
    this.themeSelected = this.settingsService.getThemeSelected();
  }

  changeTheme(theme: string) {
    this.settingsService.changeTheme(theme);
    this.themeSelected = theme;
  }
}
