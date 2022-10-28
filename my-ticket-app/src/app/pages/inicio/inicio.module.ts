import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, InicioRoutingModule, ComponentsModule]
})
export class InicioModule {}
