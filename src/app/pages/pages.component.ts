import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFuncion(): void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent implements OnInit {
  
  constructor(
    private settingsService: SettingsService
  ){

  }

  ngOnInit(): void {
    this.settingsService.setUrl();
    customInitFuncion()
  }
}
