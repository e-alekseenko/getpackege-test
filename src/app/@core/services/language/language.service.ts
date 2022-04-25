import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { TranslateService } from '@ngx-translate/core';
import { ReplaySubject, Subject } from 'rxjs';
import { StorageService, StorageItem } from '../storage';
import { Language } from './language.model';

@Injectable({
    providedIn: 'root',
})
export class LanguageService {
    public languages: Array<Language> = [];
    public dir$: ReplaySubject<string> = new ReplaySubject(1);
    public lang$: ReplaySubject<string> = new ReplaySubject(1);
    private availableLanguageCodes: string[] = [];

    constructor(
        private http: HttpClient,
        private translate: TranslateService,
        private storageService: StorageService,
    ) {}

    public init() {
        this.availableLanguageCodes = this.getAvailableLanguages().map(
            (item) => item.iso,
        );
        this.translate.addLangs(this.availableLanguageCodes);
        this.setLanguage(this.getLanguage());
    }

    public loadLanguages() {
        return this.http
            .get<Array<Language>>(`/assets/json/languages.json`)
            .toPromise()
            .then((data: Array<Language> | undefined) => {
                this.languages = data || [];
            });
    }
    public getAvailableLanguages(): Language[] {
        return this.languages;
    }

    public getLanguage(): string {
        const storedLang = this.storageService.getItem(StorageItem.Lang);
        if (storedLang) {
            return storedLang as string;
        }
        const browserLang =
            this.translate.getBrowserLang() || this.defaultLanguage();
        return this.availableLanguageCodes.includes(browserLang)
            ? browserLang
            : this.defaultLanguage();
    }

    public getLangCode() {
        return this.getLanguage().substring(0, 2);
    }

    public setLanguage(lang: string) {
        this.storageService.setItem(StorageItem.Lang, lang);
        if (this.translate.currentLang !== lang) {
            this.translate.use(lang);
            this.dir$.next(
                this.languages.find((x) => x.iso === lang)?.dir || 'ltr',
            );
            this.lang$.next(lang);
        }
    }

    private defaultLanguage(): string {
        return environment.defaultLang;
    }
}

export const appLanguagesFn = (langService: LanguageService) => {
    return () => {
        return langService.loadLanguages();
    };
};
