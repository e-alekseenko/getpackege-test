import { OrderService } from './../../services/order.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from './../../../../@core/services/message.service';
import { Order } from './../../models/order.model';
import { OrderCityChange } from './../../models/order-city-change.model';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { OrderCity } from '../../models/order-city.model';
import { OrderTime } from '../../models/order-time.model';
import { LanguageService } from '@core/services/language';

@Component({
    templateUrl: './order.page.html',
    styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit, OnDestroy {
    cities$: Observable<OrderCity[]>;
    times$: Observable<OrderTime[]>;
    lang$: Observable<string>;
    created$: Observable<any>;

    cities: OrderCityChange;

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private store: Store<fromStore.OrderState>,
        private langService: LanguageService,
    ) {
        this.store.dispatch(new fromStore.LoadOrderCities());
        this.store.dispatch(new fromStore.LoadOrderTimes());
    }

    ngOnInit(): void {
        this.cities$ = this.store.select(fromStore.getOrderCities);
        this.times$ = this.store.select(fromStore.getOrderTimes);
        this.lang$ = this.langService.lang$;
    }

    cityChange(cities: OrderCityChange) {
        this.cities = cities;
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
