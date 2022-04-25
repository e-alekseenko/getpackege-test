import { OrderService } from '../../services/order.service';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import * as orderTimesActions from '../actions/order-times.action';

@Injectable()
export class OrderTimesEffects {
    constructor(
        private actions$: Actions,
        private orderService: OrderService,
    ) {}

    @Effect()
    loadOrderTimes$ = this.actions$.pipe(
        ofType(orderTimesActions.LOAD_ORDER_TIMES),
        switchMap(() => {
            return this.orderService.getTimes().pipe(
                map(
                    (times) =>
                        new orderTimesActions.LoadOrderTimesSuccess(times),
                ),
                catchError((error) =>
                    of(new orderTimesActions.LoadOrderTimesFail(error)),
                ),
            );
        }),
    );
}
