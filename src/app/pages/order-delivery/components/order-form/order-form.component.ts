import { MessageService } from './../../../../@core/services/message.service';
import { TranslateService } from '@ngx-translate/core';
import { OrderService } from './../../services/order.service';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { FormGroup, Validators, FormBuilder, NgForm } from '@angular/forms';
import {
    Component,
    OnInit,
    Output,
    EventEmitter,
    Input,
    OnDestroy,
    ChangeDetectionStrategy,
    ViewChild,
} from '@angular/core';
import { OrderCity } from '@pages/order-delivery/models/order-city.model';
import { OrderTime } from '@pages/order-delivery/models/order-time.model';
import { OrderCityChange } from '@pages/order-delivery/models/order-city-change.model';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-order-form',
    templateUrl: './order-form.component.html',
    styleUrls: ['./order-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderFormComponent implements OnInit, OnDestroy {
    @Input() cities$: Observable<OrderCity[]>;
    @Input() lang$: Observable<string>;
    @Input() times$: Observable<OrderTime[]>;

    @Output() cityChanged = new EventEmitter<OrderCityChange>();

    @ViewChild('formDirective') private formDirective: NgForm;

    private unsubscribe$: Subject<void> = new Subject<void>();

    amount: number = 0;

    filteredTimes$: Observable<string[]>;
    minDate = new Date();
    avaliableDays: string[];

    form: FormGroup = this.fb.group({
        senderName: ['', [Validators.required]],
        senderPhone: ['', [Validators.required]],
        senderAddress: ['', [Validators.required]],
        senderCity: ['', [Validators.required]],
        receiverName: ['', [Validators.required]],
        receiverPhone: ['', [Validators.required]],
        receiverAddress: ['', [Validators.required]],
        receiverCity: ['', [Validators.required]],
        date: [null, [Validators.required]],
        time: [null, [Validators.required]],
    });

    get formData() {
        return this.form.controls;
    }

    constructor(
        private fb: FormBuilder,
        private messageService: MessageService,
        private translateService: TranslateService,
        private orderService: OrderService,
    ) {
        this.formData['date'].valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((date: Date) => {
                const day = this.getDayName(date);
                this.filteredTimes$ = this.times$.pipe(
                    map((times) => {
                        return times.find((x) => x.day === day).times;
                    }),
                );
            });
        this.formData['senderCity'].valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.cityChange();
            });
        this.formData['receiverCity'].valueChanges
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.cityChange();
            });
    }

    ngOnInit(): void {
        this.times$.pipe(takeUntil(this.unsubscribe$)).subscribe((times) => {
            this.avaliableDays = times
                .filter((x) => x.times.length > 0)
                .map((x) => x.day);
        });
    }

    cityChange() {
        const senderCity: OrderCity = this.formData['senderCity'].value;
        const receiverCity: OrderCity = this.formData['receiverCity'].value;
        this.cityChanged.emit({
            senderCity,
            receiverCity,
        });
        if (senderCity && receiverCity) {
            if (senderCity.enName === receiverCity.enName) {
                this.amount = senderCity.price;
                return;
            }
            this.amount = senderCity.price + receiverCity.price + 10;
        }
    }

    onSubmit() {
        if (this.form.invalid) {
            return;
        }
        this.orderService.create(this.form.value).subscribe(
            () => {
                this.messageService.success(
                    this.translateService.instant('order.success'),
                );
                this.formDirective.resetForm();
                this.amount = 0;
            },
            (error) => {
                this.messageService.error(error);
            },
        );
    }

    dateFilter = (d: Date | null): boolean => {
        if (!d) return false;
        const day = this.getDayName(d);
        return this.avaliableDays.includes(day);
    };

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    private getDayName(date: Date) {
        return date.toLocaleDateString('en', { weekday: 'short' });
    }
}
