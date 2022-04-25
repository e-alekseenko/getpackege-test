import { OrderTime } from './../../models/order-time.model';
import { Action } from '@ngrx/store';

export const LOAD_ORDER_TIMES = '[Order] Load Times';
export const LOAD_ORDER_TIMES_FAIL = '[Order] Load Times Fail';
export const LOAD_ORDER_TIMES_SUCCESS = '[Order] Load Times Success';

export class LoadOrderTimes implements Action {
  readonly type = LOAD_ORDER_TIMES;
}

export class LoadOrderTimesFail implements Action {
  readonly type = LOAD_ORDER_TIMES_FAIL;
  constructor(public payload: any) {}
}

export class LoadOrderTimesSuccess implements Action {
  readonly type = LOAD_ORDER_TIMES_SUCCESS;
  constructor(public payload: OrderTime[]) {}
}

export type OrderTimesAction =
  | LoadOrderTimes
  | LoadOrderTimesFail
  | LoadOrderTimesSuccess;
