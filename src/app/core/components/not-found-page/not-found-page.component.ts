import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from '../../../app.routes';

@Component({
  selector: 'app-not-found-page',
  templateUrl: './not-found-page.component.html',
  styles: [],
})
export class NotFoundPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {}

  navigateToHome() {
    this.router.navigate([AppRoutes.DASHBOARD]);
  }
}
