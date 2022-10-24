import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [HeaderComponent, NavComponent],
  exports: [HeaderComponent],
  imports: [CommonModule, HttpClientModule]
})
export class ViewsModule {}
