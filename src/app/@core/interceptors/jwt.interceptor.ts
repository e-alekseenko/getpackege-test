import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { AuthService } from '@pages/auth/services/auth.service';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        request.method;
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (
            this.authService.isLoggedIn &&
            isApiUrl &&
            request.method === 'POST'
        ) {
            request = request.clone({
                body: {
                    ...(request.body as object),
                    token: this.authService.token,
                },
            });
        }

        return next.handle(request);
    }
}
