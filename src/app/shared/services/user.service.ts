import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment.development';
import { UserDetail } from '../../shared/models/user-detail.model';
import { NgForm } from "@angular/forms";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = environment.apiBaseUrl + '/users'
  list: UserDetail[] = [];
  formData: UserDetail = new UserDetail()
  formSubmitted: boolean = false;

  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.baseUrl)
      .subscribe({
        next: res => {
          this.list = res as UserDetail[]
        },
        error: err => { console.log(err) }
      })
  }

  postUserDetail() {
    return this.http.post(this.baseUrl, this.formData)
  }

  putUserDetail() {
    return this.http.put(this.baseUrl + '/' + this.formData.id, this.formData)
  }

  deleteUserDetail(id: number) {
    return this.http.delete(this.baseUrl + '/' + id)
  }

  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new UserDetail()
    this.formSubmitted = false
  }

  addRecord(formData: FormData): Observable<any> {
    return this.http.post<any>("http://localhost:5156/api/auth/register", formData);
  }

}
