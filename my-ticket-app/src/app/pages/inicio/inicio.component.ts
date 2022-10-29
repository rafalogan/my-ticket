import { Component, OnInit } from '@angular/core';
import { EventEntity } from 'app/entities/event.entity';
import { EventService } from 'src/app/services/event.service';
import { take } from 'rxjs';
import { onError, onLog } from 'src/app/utils';
import { ButtonOptions, Events } from 'app/types';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  movies: EventEntity[];
  events: EventEntity[];
  sports: EventEntity[];
  headerData: EventEntity;
  headerButtons: ButtonOptions[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.findData();
  }

  findData() {
    this.findMovies();
    this.findEvents();
    this.findSports();
    this.getHeader();
  }

  findMovies() {
    return this.findByType(1, 'filmes', 5);
  }

  findEvents() {
    return this.findByType(1, 'eventos', 5);
  }

  findSports() {
    return this.findByType(1, 'esportes', 5);
  }

  getHeader() {
    const id = Math.floor(Math.random() * 20);
    return this.eventService
      .getEvent(id)
      .pipe(take(1))
      .subscribe({
        next: event => {
          this.headerData = new EventEntity(event);
          this.headerButtons = [
            {
              text: 'Comprar',
              cssClass: 'btn',
              icon: 'icon-shop',
              action: () => onLog('Compar')
            },
            {
              text: 'Mais Informações',
              cssClass: 'btn btn-outline',
              icon: 'icon-info',
              action: () => onLog('infos')
            }
          ];
          onLog('data to header', this.headerData);
          return this.headerData;
        },
        error: err => onError('Error ao buscar Evento', err)
      });
  }

  private findByType(page: number, type: string, limit: number) {
    return this.eventService
      .getEventsByType(page, type, limit)
      .pipe(take(1))
      .subscribe({
        next: (events: Events) => {
          const value = events.data;

          if (type === 'esportes') return (this.sports = value.map(i => new EventEntity(i)));
          if (type === 'eventos') return (this.events = value.map(i => new EventEntity(i)));

          return (this.movies = value.map(i => new EventEntity(i)));
        },
        error: err => onError('Error ao buscar Eventos', err)
      });
  }
}
