import { Injectable } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { User } from '../interfaces/user.interfaz';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserRegister } from '../interfaces/user-register.interface';
import { Observable, tap } from 'rxjs';
import { FacebookAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http: HttpClient) { }

  getAuth(){
    return getAuth();
  }

  logIn(user: User): Observable<any> {
    return this._http.post(`${environment.Back_server}/auth/login`, user).pipe(
      tap((response: any) => {
        console.log('response', response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));
      })
    );
  }

  logInFacebook(): Promise<any> {
    return signInWithPopup(getAuth(), new FacebookAuthProvider()).then(result => {
      result.user?.getIdToken().then(facebookIdToken => {
        console.log('facebookIdToken', result);
        
        this._http.post(`${environment.Back_server}/auth/facebook`, { idToken: facebookIdToken }).subscribe((response: any) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
        });
      });
    });
  }

  logInGoogle(): Promise<any> {
    return signInWithPopup(getAuth(), new GoogleAuthProvider()).then(result => {
      
      result.user?.getIdToken().then(googleIdToken => {
        this._http.post(`${environment.Back_server}/auth/google/ios`, { idToken: googleIdToken }).subscribe((response: any) => {
          localStorage.setItem('token', response.access_token);
          localStorage.setItem('user', JSON.stringify(response.user));
        });
      });
    });
  }

  logOut(): Promise<void> {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return getAuth().signOut();
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    if (typeof window === 'undefined') return null;
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  isAuthenticated(): boolean {
    const user = this.getUser();
    return user !== null;
  }

  register(user: UserRegister):Observable<any> {
    return this._http.post(`${environment.Back_server}/users`, user);
  }
}