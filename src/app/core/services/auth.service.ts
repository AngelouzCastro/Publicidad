import { Injectable } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, UserCredential, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { User } from '../interfaces/user.interfaz';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  getAuth(){
    return getAuth();
  }

  register(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  logIn(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  logInGoogle(): Promise<UserCredential> {
    return signInWithPopup(getAuth(), new GoogleAuthProvider());
  }

  logOut(): Promise<void> {
    return getAuth().signOut();
  }

  isAuthenticated(): boolean {
    const user = getAuth().currentUser;
    return user !== null;
  }
}