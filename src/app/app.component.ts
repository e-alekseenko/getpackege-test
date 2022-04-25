import { AuthService } from './pages/auth/services/auth.service';
import { Component, OnInit, Renderer2 } from '@angular/core';
import { LanguageService } from '@core/services/language';
import { Observable } from 'rxjs';
import { Directionality } from '@angular/cdk/bidi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'getpackage-alekseenko';
  isLoggedIn$!: Observable<boolean>;

  constructor(
    private langService: LanguageService,
    private authService: AuthService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
    this.runGlobalServices();
  }

  private runGlobalServices(): void {
    this.langService.dir$.subscribe((dir) => {
      this.renderer.setAttribute(document.body, 'dir', dir);
    });
    this.langService.init();
  }
}
