import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-central-layout',
  templateUrl: './central-layout.component.html',
  styleUrls: ['./central-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CentralLayoutComponent {}
