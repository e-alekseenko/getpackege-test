import { OrderCity } from '@pages/order-delivery/models/order-city.model';
import * as fromOrderCities from '../actions/order-cities.action';

export interface OrderCitiesState {
    data: OrderCity[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: OrderCitiesState = {
    data: [],
    loaded: false,
    loading: false,
};

export function reducer(
    state = initialState,
    action: fromOrderCities.OrderCitiesAction,
): OrderCitiesState {
    switch (action.type) {
        case fromOrderCities.LOAD_ORDER_CITIES: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromOrderCities.LOAD_ORDER_CITIES_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                data,
            };
        }

        case fromOrderCities.LOAD_ORDER_CITIES_FAIL: {
            return {
                ...state,
                loading: false,
                loaded: false,
            };
        }

        default:
            return { ...state };
    }
}

export const getOrderCitiesLoading = (state: OrderCitiesState) => state.loading;
export const getOrderCitiesLoaded = (state: OrderCitiesState) => state.loaded;
export const getOrderCities = (state: OrderCitiesState) => state.data;
