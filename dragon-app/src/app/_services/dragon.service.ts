import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dragon } from '@/_models/dragon';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DragonService {
  constructor(private http: HttpClient) { }
  private API_URL= environment.API_URL;
  getAll() {
    return this.http.get<Dragon[]>(`${config.apiUrlDragons}/api/dragons`);
  }

  getById(slug: string) {
    return this.http.get(`${config.apiUrlDragons}/api/dragons/${slug}`);
  }

  register(dragon: Dragon) {
    return this.http.post(`${config.apiUrlDragons}/api/dragons`, dragon);
  }

  update(dragon: Dragon) {
    return this.http.put(`${config.apiUrlDragons}/api/dragons/${dragon.slug}`, dragon);
  }

  delete(slug: string) {
    return this.http.delete(`${config.apiUrlDragons}/api/dragons${slug}`);
  }
}