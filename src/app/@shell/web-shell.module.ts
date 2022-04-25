import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, NoAuthGuard } from '@core/guards';
import { ROUTER_UTILS } from '@core/utils/router.utils';
import { NotFoundModule } from '@shell/ui/not-found/not-found.module';
import { CentralLayoutModule } from './ui/central-layout/central-layout.module';
import { FooterModule } from './ui/footer/footer.module';
import { HeaderModule } from './ui/header/header.module';
import { LayoutModule } from './ui/layout/layout.module';
import { NotFoundPage } from './ui/not-found/not-found.page';

const APP_ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: ROUTER_UTILS.config.base.home,
    },
    {
        path: ROUTER_UTILS.config.auth.signIn,
        loadChildren: async () =>
            (await import('@pages/auth/auth.module')).AuthModule,
        canLoad: [NoAuthGuard],
    },
    {
        path: ROUTER_UTILS.config.base.home,
        loadChildren: async () =>
            (await import('@pages/order-delivery/order-delivery.module'))
                .OrderDeliveryModule,
        canLoad: [AuthGuard],
        canActivate: [AuthGuard],
    },
    {
        path: '**',
        loadChildren: async () =>
            (await import('@shell/ui/not-found/not-found.module'))
                .NotFoundModule,
        component: NotFoundPage,
    },
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(APP_ROUTES),
        FooterModule,
        HeaderModule,
        LayoutModule,
        CentralLayoutModule,
        NotFoundModule,
    ],
    exports: [
        RouterModule,
        FooterModule,
        HeaderModule,
        LayoutModule,
        CentralLayoutModule,
        NotFoundModule,
    ],
})
export class WebShellModule {}
