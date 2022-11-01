import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from 'app/components/components.module';
import { ViewsModule } from './views/views.module';
import { SafePipe } from './core/pipes/safe.pipe';

@NgModule({
  declarations: [AppComponent, SafePipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ComponentsModule, ViewsModule, RouterModule],
  providers: [],
  exports: [SafePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
