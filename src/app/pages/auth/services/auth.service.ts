import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService, StorageItem } from '@core/services/storage';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private readonly loginUrl = '/login';
    constructor(
        private storageService: StorageService,
        private http: HttpClient,
    ) {}
    isLoggedIn$ = new BehaviorSubject<boolean>(
        !!this.storageService.getItem(StorageItem.Auth),
    );

    get isLoggedIn(): boolean {
        return this.isLoggedIn$.getValue();
    }

    get token(): string {
        return this.storageService.getItem(StorageItem.Auth) as string;
    }

    signIn(user: any): Observable<any> {
        return this.http
            .post(`${environment.apiUrl}${this.loginUrl}`, user)
            .pipe(
                map((res: any) => {
                    if (res.token) {
                        this.storageService.setItem(
                            StorageItem.Auth,
                            res.token,
                        );
                        this.isLoggedIn$.next(true);
                        return res;
                    } else {
                        throw new Error();
                    }
                }),
            );
    }

    signOut(): void {
        this.storageService.removeItem(StorageItem.Auth);
        this.isLoggedIn$.next(false);
    }
}
