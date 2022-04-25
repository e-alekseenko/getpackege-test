import { OrderCityChange } from './../../models/order-city-change.model';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { map, of, Observable } from 'rxjs';
import {
    Component,
    HostListener,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';

@Component({
    selector: 'app-order-map',
    template: `
        <div *ngIf="mapLoaded$ | async">
            <google-map
                height="400px"
                [width]="width"
                [center]="center"
                [zoom]="zoom"
            >
                <map-directions-renderer
                    *ngIf="directionsResults$ | async as directionsResults"
                    [directions]="directionsResults"
                ></map-directions-renderer>
            </google-map>
        </div>
    `,
})
export class OrderMapComponent implements OnChanges {
    @Input() cities: OrderCityChange;
    mapLoaded$: Observable<boolean>;
    width: number = 400;

    center: google.maps.LatLngLiteral = environment.mapInitCoord;
    zoom = 7;

    directionsResults$: Observable<google.maps.DirectionsResult | undefined>;

    @HostListener('window:resize')
    onResize() {
        this.calcWidth();
    }

    constructor(
        httpClient: HttpClient,
        private mapDirectionsService: MapDirectionsService,
    ) {
        this.mapLoaded$ = httpClient
            .jsonp(environment.googleMapUrl, 'callback')
            .pipe(
                map(() => true),
                catchError(() => of(false)),
            );
        this.calcWidth();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.cities?.senderCity && this.cities?.receiverCity) {
            const request: google.maps.DirectionsRequest = {
                origin: `${environment.country}, ${this.cities.senderCity.enName}`,
                destination: `${environment.country}, ${this.cities.receiverCity.enName}`,
                travelMode: google.maps.TravelMode.DRIVING,
            };
            this.directionsResults$ = this.mapDirectionsService
                .route(request)
                .pipe(map((response) => response.result));
        }
    }

    private calcWidth() {
        if (window.innerWidth > 700) {
            this.width = 500;
            return;
        }
        if (window.innerWidth < 400) {
            this.width = window.innerWidth - 20;
            return;
        }
        this.width = 400;
    }
}
