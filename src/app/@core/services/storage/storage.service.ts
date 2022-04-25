import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

export enum StorageItem {
  Auth = 'App/auth',
  Lang = 'App/lang',
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService) {}

  getItem = (itemName: StorageItem): unknown | null => {
    const item = this.cookieService.get(itemName);
    return item ? JSON.parse(item) : null;
  };

  setItem = (itemName: StorageItem, value: unknown): void => {
    this.cookieService.set(itemName, JSON.stringify(value));
  };

  removeItem = (itemName: StorageItem): void => {
    this.cookieService.delete(itemName);
  };
}
