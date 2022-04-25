import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root',
})
export class MessageService {
    constructor(private toastrService: ToastrService) {}

    error(error: string) {
        this.toastrService.error(error);
    }

    success(message: string) {
        console.log('message: ', message);
        this.toastrService.success(message);
    }
}
