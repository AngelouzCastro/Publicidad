import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserRegister } from '../../interfaces/user-register.interface';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule, 
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    picture: new FormControl(''),
    facebookId: new FormControl(''),
    facebookUserAccessTokenLongLived: new FormControl('')
  });

  loading = false;
  success = false;
  error: string | null = null;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    this.error = null;
    const req: UserRegister = {
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      name: this.registerForm.value.name || '',
      picture: this.registerForm.value.picture || '',
      facebookId: this.registerForm.value.facebookId || '',
      facebookUserAccessTokenLongLived: this.registerForm.value.facebookUserAccessTokenLongLived || ''
    } 
        
    this.authService.register(req).subscribe({
      next: () => {
        this.success = true;
        this.loading = false;
        console.log('User registered successfully');
        
      },
      error: err => {
        this.error = err.message || 'Registration failed';
        console.error(err);
        this.loading = false;
      }
    });
  }
}