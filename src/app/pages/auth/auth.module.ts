import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LangSelectorModule } from '@components/lang-selector';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthFormComponent } from './components/auth-form.component';
import { LoginPage } from './pages/login/login.page';
import { LoaderModule } from '@components/loader';

const routes: Routes = [
  {
    path: '',
    component: LoginPage,
  },
];

@NgModule({
  declarations: [LoginPage, AuthFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    LangSelectorModule,
    LoaderModule,

    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,

    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
