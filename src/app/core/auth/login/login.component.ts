import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from '../../interfaces/user.interfaz';
// import { Auth, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
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


  async onSubmit() {
    console.log('click en login');
    console.log(this.loginForm.value);
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    } else {
      await this._authServie.logIn(this.loginForm.value as User).subscribe({
        next: () => {
          this._router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    // Implementar lógica de inicio de sesión
    console.log('Login attempt', this.loginForm.value);
  }

  // private auth: Auth = inject(Auth);
  async loginWithGoogle() {
    this._authServie.logInGoogle().then(
      resp => {
        console.log(resp, 'todo fine');
        this._router.navigate(['/dashboard']);
      })
      .catch(error => {
        console.log(error);
      });
  }

  async loginWithFacebook() {
    this._authServie.logInFacebook().then(
      resp => {
        this._router.navigate(['/dashboard']);
      },
      err => {
        console.error(err);
      }
    );
  }
}