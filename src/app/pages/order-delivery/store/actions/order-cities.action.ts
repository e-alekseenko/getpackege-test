import { OrderCity } from './../../models/order-city.model';
import { Action } from '@ngrx/store';

export const LOAD_ORDER_CITIES = '[Order] Load Cities';
export const LOAD_ORDER_CITIES_FAIL = '[Order] Load Cities Fail';
export const LOAD_ORDER_CITIES_SUCCESS = '[Order] Load Cities Success';

export class LoadOrderCities implements Action {
  readonly type = LOAD_ORDER_CITIES;
}

export class LoadOrderCitiesFail implements Action {
  readonly type = LOAD_ORDER_CITIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadOrderCitiesSuccess implements Action {
  readonly type = LOAD_ORDER_CITIES_SUCCESS;
  constructor(public payload: OrderCity[]) {}
}

export type OrderCitiesAction =
  | LoadOrderCities
  | LoadOrderCitiesFail
  | LoadOrderCitiesSuccess;
