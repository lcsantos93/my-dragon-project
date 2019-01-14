import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models/user';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }
  private API_URL= environment.API_URL;
  getAll() {
    return this.http.get<User[]>(`${this.API_URL}/users`);
  }

  getById(id: number) {
    return this.http.get(`${this.API_URL}/users/${id}`);
  }

  register(user: User) {
    return this.http.post(`${this.API_URL}/users/register`, user);
  }

  update(user: User) {
    return this.http.put(`${this.API_URL}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${this.API_URL}/users/${id}`);
  }
}