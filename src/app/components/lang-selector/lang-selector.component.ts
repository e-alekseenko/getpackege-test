import { Component, Input, OnInit } from '@angular/core';
import { LanguageService, Language } from '@core/services/language';

@Component({
  selector: 'app-lang-selector',
  templateUrl: './lang-selector.component.html',
  styleUrls: ['./lang-selector.component.scss'],
})
export class LangSelectorComponent implements OnInit {
  opened = false;

  public availableLangs: Language[];
  public currentLang: Language;

  constructor(private languageService: LanguageService) {
    this.availableLangs = this.languageService.getAvailableLanguages();
    const lang = this.availableLangs.find(
      (x) => x.iso === this.languageService.getLanguage()
    );
    if (lang) {
      this.currentLang = lang;
      return;
    }
    this.currentLang = this.availableLangs[0];
  }

  ngOnInit() {}

  public changeLanguage(lang: Language) {
    this.languageService.setLanguage(lang.iso);
    this.currentLang = lang;
  }
}
