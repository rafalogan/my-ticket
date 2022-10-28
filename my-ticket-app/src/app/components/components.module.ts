import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightsComponent } from './highlights/highlights.component';

@NgModule({
  declarations: [HighlightsComponent],
  exports: [HighlightsComponent],
  imports: [CommonModule]
})
export class ComponentsModule {}
