import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CentralLayoutComponent } from './central-layout.component';

@NgModule({
  declarations: [CentralLayoutComponent],
  imports: [CommonModule, MatCardModule],
  exports: [CentralLayoutComponent],
})
export class CentralLayoutModule {}
