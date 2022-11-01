import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventEntity } from 'app/entities/event.entity';
import { take } from 'rxjs';
import { EventService } from 'src/app/services/event.service';
import { getBackgroundImage, onError, onLog } from 'src/app/utils';
import { ButtonOptions, FileEvent } from 'app/types';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  eventId: number;
  event: EventEntity;
  trailer: FileEvent;
  headerButton: ButtonOptions[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  setBackgroundImage() {
    return getBackgroundImage(this.event.files.cover?.url as string);
  }

  getParams() {
    return this.activatedRoute.queryParams.pipe(take(1)).subscribe({
      next: params => {
        this.eventId = Number(params['event-id']);
        this.headerButton = [
          {
            text: 'Comprar',
            icon: 'icon-shop',
            cssClass: 'btn',
            action: () => this.shopButton()
          }
        ];
        return this.getEvent();
      },
      error: err => onError('error on set params', err)
    });
  }

  shopButton() {
    onLog('shop tickets');
  }

  getEvent() {
    return this.eventService
      .getEvent(this.eventId)
      .pipe(take(1))
      .subscribe({
        next: data => {
          this.event = new EventEntity(data);
          this.trailer = this.event.files.videos?.find(v => v.location === 'trailer') as FileEvent;
          this.trailer.src =
            this.trailer && this.trailer?.type.includes('youtube')
              ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.trailer?.name}`)
              : undefined;
          onLog('Trailer', this.trailer);
          onLog('event', this.event);
        },
        error: err => onError('Error to get Event', err)
      });
  }
}
