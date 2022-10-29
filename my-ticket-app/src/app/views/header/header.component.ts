import { Component, Input, OnInit } from '@angular/core';
import { EventEntity } from 'app/entities/event.entity';
import { ButtonOptions } from 'app/types';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() event: EventEntity;
  @Input() buttons: ButtonOptions[] = [];
  constructor() {}

  ngOnInit(): void {}

  setBackgroundImage() {
    return `background-image: url('${this.event?.files?.cover?.url}')`;
  }
}
