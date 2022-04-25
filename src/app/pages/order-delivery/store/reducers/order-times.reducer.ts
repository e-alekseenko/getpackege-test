import { OrderTime } from './../../models/order-time.model';
import * as fromOrderTimes from '../actions/order-times.action';

export interface OrderTimesState {
    data: OrderTime[];
    loaded: boolean;
    loading: boolean;
}

export const initialState: OrderTimesState = {
    data: [],
    loaded: false,
    loading: false,
};

export function reducer(
    state = initialState,
    action: fromOrderTimes.OrderTimesAction,
): OrderTimesState {
    switch (action.type) {
        case fromOrderTimes.LOAD_ORDER_TIMES: {
            return {
                ...state,
                loading: true,
            };
        }

        case fromOrderTimes.LOAD_ORDER_TIMES_SUCCESS: {
            const data = action.payload;
            return {
                ...state,
                loading: false,
                loaded: true,
                data,
            };
        }

        case fromOrderTimes.LOAD_ORDER_TIMES_FAIL: {
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

export const getOrderTimesLoading = (state: OrderTimesState) => state.loading;
export const getOrderTimesLoaded = (state: OrderTimesState) => state.loaded;
export const getOrderTimes = (state: OrderTimesState) => state.data;
