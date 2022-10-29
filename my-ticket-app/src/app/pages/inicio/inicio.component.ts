import { Component, OnInit } from '@angular/core';
import { EventEntity } from 'app/entities/event.entity';
import { EventService } from 'src/app/services/event.service';
import { find, take } from 'rxjs';
import { onError, onLog } from 'src/app/utils';
import { Events } from 'app/types';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  movies: EventEntity[];
  events: EventEntity[];
  sports: EventEntity[];

  headerItems: number[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.findData();
  }

  findData() {
    this.findMovies();
    this.findEvents();
    this.findSports();
    this.setHeader();
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

  private findByType(page: number, type: string, limit: number) {
    return this.eventService
      .getEventsByType(page, type, limit)
      .pipe(take(1))
      .subscribe({
        next: (events: Events) => {
          const value = events.data;

          this.headerItems =
            this.headerItems && this.headerItems.length
              ? [...this.headerItems, ...value.map(i => i.id)]
              : [...value.map(i => i.id)];

          onLog('header', this.headerItems);

          if (type === 'esportes') return (this.sports = value.map(i => new EventEntity(i)));
          if (type === 'eventos') return (this.events = value.map(i => new EventEntity(i)));

          return (this.movies = value.map(i => new EventEntity(i)));
        },
        error: err => onError('Error ao buscar filmes', err)
      });
  }

  private setHeader() {}
}
