import { CommonModule } from '@angular/common';
import {
    HttpClient,
    HttpClientJsonpModule,
    HttpClientModule,
    HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { JwtInterceptor, ServerErrorInterceptor } from './interceptors';
import { LanguageService, appLanguagesFn } from '@core/services/language';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ToastrModule } from 'ngx-toastr';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        HttpClientModule,
        HttpClientJsonpModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        StoreModule.forRoot({}, {}),
        EffectsModule.forRoot([]),
        ToastrModule.forRoot({
            timeOut: 10000,
            closeButton: true,
        }),
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: appLanguagesFn,
            multi: true,
            deps: [LanguageService],
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ServerErrorInterceptor,
            multi: true,
        },
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ],
})
export class CoreModule {}
