import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public dashboard: boolean = false;

  public constructor(private router: Router) {}

  public ngOnInit(): void {
    this.dashboard = this.router.url.includes('dashboard');
    console.log(this.dashboard);
  }
}
