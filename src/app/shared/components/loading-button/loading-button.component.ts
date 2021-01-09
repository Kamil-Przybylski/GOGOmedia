import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styles: [
  ]
})
export class LoadingButtonComponent implements OnInit {
  @Input() isLoading!: boolean | null;
  diameter = 20;

  constructor() { }

  ngOnInit(): void {
  }

}
