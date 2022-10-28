import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewsModule } from 'app/views/views.module';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ComponentsModule } from 'app/components/components.module';

@NgModule({
  declarations: [AppComponent, InicioComponent],
  imports: [BrowserModule, AppRoutingModule, ViewsModule, HttpClientModule, ComponentsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
