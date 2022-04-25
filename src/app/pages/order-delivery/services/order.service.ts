import { OrderTime } from './../models/order-time.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderCity } from '../models/order-city.model';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
    private readonly createUrl = '/submit';
    private readonly cityUrl = '/cities';
    private readonly timesUrl = '/times';
    constructor(private http: HttpClient) {}

    getCities(): Observable<OrderCity[]> {
        return this.http.get<OrderCity[]>(
            `${environment.apiUrl}${this.cityUrl}`,
        );
    }

    getTimes(): Observable<OrderTime[]> {
        return this.http.get<OrderTime[]>(
            `${environment.apiUrl}${this.timesUrl}`,
        );
    }

    create(order: Order): Observable<any> {
        return this.http
            .post(`${environment.apiUrl}${this.createUrl}`, order)
            .pipe();
    }
}
