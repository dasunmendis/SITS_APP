import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import { UserDetail } from './user-detail.model';
import { NgForm } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UserDetailService {

  url: string = environment.apiBaseUrl + '/users'
  list: UserDetail[] = [];
  formData: UserDetail = new UserDetail()
  formSubmitted: boolean = false;
  constructor(private http: HttpClient) { }

  refreshList() {
    this.http.get(this.url)
      .subscribe({
        next: res => {
          this.list = res as UserDetail[]
        },
        error: err => { console.log(err) }
      })
  }

  postUserDetail() {
    return this.http.post(this.url, this.formData)
  }

  putUserDetail() {
    return this.http.put(this.url + '/' + this.formData.id, this.formData)
  }


  deleteUserDetail(id: number) {
    return this.http.delete(this.url + '/' + id)
  }


  resetForm(form: NgForm) {
    form.form.reset()
    this.formData = new UserDetail()
    this.formSubmitted = false
  }

}
