import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Events, EventsOptions, IEvent, ListOptions } from 'app/types';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  url = `${environment.api}${environment.events}`;

  constructor(private http: HttpClient) {}

  getEvents(options?: EventsOptions): Observable<Events> {
    const keys = options ? Object.keys(options) : undefined;
    const page = options?.page ? `page=${options.page}` : '';
    const limit = options?.limit ? `limit=${options.limit}` : '';
    const params = page && limit ? `?${page}&${limit}` : page || limit ? `?${page || limit}` : '';

    return this.http.get<Events>(`${this.url}${params}`);
  }

  getEventsByType(page: number, type: string, limit: number): Observable<Events> {
    return this.http.get<Events>(`${this.url}?page=${page}&type=${type}&limit=${limit}`);
  }

  getEvent(id: number): Observable<IEvent> {
    return this.http.get<IEvent>(`${this.url}/${id}`);
  }
}
