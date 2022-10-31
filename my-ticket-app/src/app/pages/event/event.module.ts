import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewsModule } from 'app/views/views.module';
import { EventComponent } from 'app/pages/event/event.component';
import { EventRoutingModule } from 'app/pages/event/event-routing.module';
import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [EventComponent],
  imports: [CommonModule, EventRoutingModule, ComponentsModule, ViewsModule]
})
export class EventModule {}
