import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from 'app/pages/not-found/not-found.component';
import { NotFoundRoutingModule } from './not-found-routing.module';
import { ViewsModule } from 'app/views/views.module';

@NgModule({
  declarations: [NotFoundComponent],
  imports: [CommonModule, NotFoundRoutingModule, ViewsModule]
})
export class NotFoundModule {}
