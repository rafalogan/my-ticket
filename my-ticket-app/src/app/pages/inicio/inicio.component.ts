import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  sectionData: number[];

  constructor() {}

  ngOnInit(): void {
    this.sectionData = [1, 2, 3, 4, 5];
  }
}
