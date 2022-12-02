import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';
import { ViewsModule } from 'app/views/views.module';

@NgModule({
  declarations: [EventsComponent],
  imports: [CommonModule, EventsRoutingModule, ViewsModule]
})
export class EventsModule {}