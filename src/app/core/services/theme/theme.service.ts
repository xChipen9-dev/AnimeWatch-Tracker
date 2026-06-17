import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  isDark: boolean = false;

  constructor() {

    const saved = localStorage.getItem('theme');
    this.isDark = saved === 'dark';

    document.body.classList.toggle('dark-mode', this.isDark);
  }

  toggleTheme() {
    this.isDark = !this.isDark;

    document.body.classList.toggle('dark-mode', this.isDark);

    localStorage.setItem('theme', this.isDark ? 'dark' : 'light');
  }
}
