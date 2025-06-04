import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/user.interfaz';
// import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.componet.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  hidePassword: boolean = true;
  email: string = '';
  emailInvalid: boolean = false;

  _authServie = inject(AuthService);
  _router = inject(Router);


  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      this._authServie.logIn(this.loginForm.value as User).then(
        resp => {
        this._router.navigate(['/dashboard']);
      })
      .catch(error => {
          console.log(error);
      });
    }
    // Implementar lógica de inicio de sesión
    console.log('Login attempt', this.loginForm.value);
  }

  // private auth: Auth = inject(Auth);
  async loginWithGoogle() {
    this._authServie.logInGoogle().then(
      resp => {
        this._router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log(error);
      });
  }
}