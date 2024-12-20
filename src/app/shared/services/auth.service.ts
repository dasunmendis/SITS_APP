import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  baseURL = 'http://localhost:5156/api';

  createUser(formData:any){
    console.log(formData);
    return this.http.post(this.baseURL+'/auth/register',formData);
    
  }

  signin(formData:any){
    return this.http.post(this.baseURL+'/auth/login',formData);
  }

}
