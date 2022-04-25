import {
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
} from '@ngrx/store';

import * as fromOrderCities from './order-cities.reducer';
import * as fromOrderTimes from './order-times.reducer';

export interface OrderState {
    orderCities: fromOrderCities.OrderCitiesState;
    orderTimes: fromOrderTimes.OrderTimesState;
}

export const reducers: ActionReducerMap<OrderState> = {
    orderCities: fromOrderCities.reducer,
    orderTimes: fromOrderTimes.reducer,
};

export const getOrderState = createFeatureSelector<OrderState>('order');

// Order Cities
export const getOrderCitiesState = createSelector(
    getOrderState,
    (state: OrderState) => state.orderCities,
);

export const getOrderCities = createSelector(
    getOrderCitiesState,
    fromOrderCities.getOrderCities,
);
export const getOrderCitiesLoading = createSelector(
    getOrderCitiesState,
    fromOrderCities.getOrderCitiesLoading,
);
export const getOrderCitiesLoaded = createSelector(
    getOrderCitiesState,
    fromOrderCities.getOrderCitiesLoaded,
);

// Order Times
export const getOrderTimesState = createSelector(
    getOrderState,
    (state: OrderState) => state.orderTimes,
);

export const getOrderTimes = createSelector(
    getOrderTimesState,
    fromOrderTimes.getOrderTimes,
);
export const getOrderTimesLoading = createSelector(
    getOrderTimesState,
    fromOrderTimes.getOrderTimesLoading,
);
export const getOrderTimesLoaded = createSelector(
    getOrderTimesState,
    fromOrderTimes.getOrderTimesLoaded,
);
