import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { take } from 'rxjs';

import { EventEntity } from 'app/entities/event.entity';
import { EventService } from 'src/app/services/event.service';
import { onError, onLog } from 'src/app/utils';
import { ButtonOptions } from 'app/types';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {
  events: EventEntity[];
  event: EventEntity;

  buttons: ButtonOptions[];

  title: string;
  type: string;
  page: number;
  limit: number;
  order: string;

  constructor(private eventService: EventService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.setParams();
  }

  getHeaderEvent() {
    const ids = this.events.map(e => e.id);
    const id = ids[Math.floor(Math.random() * ids.length)];

    return this.eventService
      .getEvent(id)
      .pipe(take(1))
      .subscribe({
        next: event => {
          this.event = new EventEntity(event);
          this.buttons = [
            {
              text: 'Comparar',
              cssClass: 'btn',
              icon: 'icon-shop',
              action: () => onLog('comprar')
            },
            {
              text: 'Informações',
              cssClass: 'btn btn-outline',
              icon: 'icon-info',
              action: () => this.goToInfo(this.event)
            }
          ];
        },
        error: err => onError('Error ao buscar event', err)
      });
  }

  getEvents() {
    return this.eventService
      .getEventsByType(this.page, this.type, this.limit, this.order)
      .pipe(take(1))
      .subscribe({
        next: events => {
          this.events = events.data.map(event => new EventEntity(event));
          this.getHeaderEvent();

          if (!this.events.length) return this.redirectToHome();
          return this.events;
        },
        error: err => onError('Erro ao carregar eventos', err)
      });
  }

  setParams() {
    return this.activatedRoute.queryParams.pipe(take(1)).subscribe({
      next: params => {
        this.title = params['type'];
        this.type = params['type'].toLowerCase();
        this.page = Number(params['page'] || 1);
        this.limit = Number(params['limit'] || 10);
        this.order = params['order'] || 'DESC';

        this.getEvents();
      },
      error: err => onError('Error ao buscar', err)
    });
  }

  goToInfo(event: EventEntity) {
    return this.router.navigate(['/event'], { queryParams: { 'event-id': event.id } });
  }

  redirectToHome() {
    return this.router.navigate(['/']);
  }
}
