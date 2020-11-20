import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {loginUser} from '../../data-layer/auth/auth.actions';

@Component({
  selector: 'rvt-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  readonly form = new FormGroup({
    login: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required])
  });

  constructor(
    private readonly store: Store
  ) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.store.dispatch(loginUser({
      login: this.form.get('login').value,
      password: this.form.get('password').value,
    }));
  }
}
