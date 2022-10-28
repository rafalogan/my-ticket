import { Component, OnInit } from '@angular/core';
import { EventEntity } from 'app/entities/event.entity';
import { EventService } from 'src/app/services/event.service';
import { find, take } from 'rxjs';
import { onError, onLog } from 'src/app/utils';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  movies: EventEntity[];
  events: EventEntity[];
  sports: EventEntity[];

  headerItems: EventEntity[];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.findData();
  }

  findData() {
    return this.eventService
      .getEvents()
      .pipe(take(1))
      .subscribe({
        next: res => {
          onLog('teste envets', res);

          this.movies = res.data.filter(e => e.type === 'filmes').map(e => new EventEntity(e));
          this.events = res.data.filter(e => e.type === 'eventos').map(e => new EventEntity(e));
          this.sports = res.data.filter(e => e.type === 'esportes').map(e => new EventEntity(e));

          return (this.headerItems = [
            ...this.movies.slice(0, 3),
            ...this.events.slice(0, 3),
            ...this.sports.slice(0, 3)
          ]);
        },
        error: err => onError('ERROR', err)
      });
  }
}
