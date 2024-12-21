import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient, private apiService: ApiService) { }
  private jwtHelper = new JwtHelperService();

  // Method to store the token in localStorage (or you can use sessionStorage)
  storeToken(token: string): void {
    localStorage.setItem('token', token); // store token in localStorage
  }

  // Method to get the token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to get the token
  clearToken(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getCurrentUser(){
    let token = this.getToken();
    if(!token) return null;

    return this.jwtHelper.decodeToken(token);
  }

  createUser(formData: any){
    return this.apiService.postData('/auth/register', formData);
  }

  signin(formData: any){
    return this.apiService.postData('/auth/login', formData);
  }

}
