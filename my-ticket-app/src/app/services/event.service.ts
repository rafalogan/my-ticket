import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Events, IEvent, ListOptions } from 'app/types';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  url = `${environment.api}${environment.events}`;

  constructor(private http: HttpClient) {}

  getEvents(options?: ListOptions): Observable<Events> {
    const page = options?.page ? `page=${options.page}` : '';
    const limit = options?.limit ? `limit=${options.limit}` : '';
    const params = page && limit ? `?${page}&${limit}` : page || limit ? `?${page || limit}` : '';

    return this.http.get<Events>(`${this.url}${params}`);
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.url}/${id}`);
  }
}
