import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EventEntity } from 'app/entities/event.entity';
import { take } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { onError } from 'src/app/utils';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventId: number;
  event: EventEntity;

  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService) {}

  ngOnInit(): void {
    this.getParams();
  }

  getParams() {
    return this.activatedRoute.queryParams.pipe(take(1)).subscribe({
      next: params => {
        this.eventId = Number(params['event-id']);
      },
      error: err => onError('error on set params', err)
    });
  }

  getEvent() {
    return this.eventService
      .getEvent(this.eventId)
      .pipe(take(1))
      .subscribe({
        next: data => (this.event = new EventEntity(data)),
        error: err => onError('Error to get Event', err)
      });
  }
}
