import { OrderService } from './../../services/order.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import * as orderCitiesActions from '../actions/order-cities.action';

@Injectable()
export class OrderCitiesEffects {
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
    ) {}

    @Effect()
    loadOrderCities$ = this.actions$.pipe(
        ofType(orderCitiesActions.LOAD_ORDER_CITIES),
        switchMap(() => {
            return this.orderService.getCities().pipe(
                map(
                    (cities) =>
                        new orderCitiesActions.LoadOrderCitiesSuccess(cities),
                ),
                catchError((error) =>
                    of(new orderCitiesActions.LoadOrderCitiesFail(error)),
                ),
            );
        }),
    );
}
