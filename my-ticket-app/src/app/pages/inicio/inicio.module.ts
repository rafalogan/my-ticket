import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { ComponentsModule } from 'app/components/components.module';
import { InicioComponent } from 'app/pages/inicio/inicio.component';
import { ViewsModule } from 'src/app/views/views.module';

@NgModule({
  declarations: [InicioComponent],
  imports: [CommonModule, InicioRoutingModule, ComponentsModule, ViewsModule]
})
export class InicioModule {}
