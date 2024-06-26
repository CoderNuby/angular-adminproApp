import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private themeLink = document.querySelector("#theme");

  constructor() { }

  setUrl() {
    const theme = localStorage.getItem("theme");
    let url = "";
    if(!theme) {
      url = "./assets/css/colors/default-dark.css"
    }else{
      const themeStorage = JSON.parse(theme);
      url = themeStorage.url;
    }
    this.themeLink?.setAttribute("href", url);
  }

  getThemeSelected() {
    const themeUrl = localStorage.getItem("theme");
    let themeSelected = "";
    if(!themeUrl) {
      themeSelected = "default-dark";
    }else{
      const themeStorage = JSON.parse(themeUrl);
      themeSelected = themeStorage.theme;
    }

    return themeSelected;
  }

  changeTheme(theme: string) {
    const url = `./assets/css/colors/${theme}.css`;
    this.themeLink?.setAttribute("href", url);
    const themeStorage = {
      url,
      theme
    }
    localStorage.setItem("theme", JSON.stringify(themeStorage));
  }
}
