import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-form',
  styleUrls: ['./auth-form.component.scss'],
  templateUrl: './auth-form.component.html',
})
export class AuthFormComponent {
  @Output() submitted = new EventEmitter<any>();
  form: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder) {}

  public get emailInput() {
    return this.form.get('email');
  }

  public get passwordInput() {
    return this.form.get('password');
  }

  public onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.submitted.emit(this.form.value);
  }
}
