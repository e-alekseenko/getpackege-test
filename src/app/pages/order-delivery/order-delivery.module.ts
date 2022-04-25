import { OrderService } from './services/order.service';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderPage } from './pages/order/order.page';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { LoaderModule } from '@components/loader';
import { NgxMaskModule } from 'ngx-mask';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from './store';
import { GoogleMapsModule } from '@angular/google-maps';
import { OrderMapComponent } from './components/order-map/order-map.component';

@NgModule({
    declarations: [OrderPage, OrderFormComponent, OrderMapComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TranslateModule,
        LoaderModule,
        RouterModule.forChild([
            {
                path: '',
                component: OrderPage,
                data: {
                    title: 'Order Delivery',
                    robots: 'noindex, nofollow',
                },
            },
        ]),
        StoreModule.forFeature('order', reducers),
        EffectsModule.forFeature(effects),

        NgxMaskModule.forRoot(),
        GoogleMapsModule,

        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCardModule,
    ],
    providers: [OrderService],
})
export class OrderDeliveryModule {}
