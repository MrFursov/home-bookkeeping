import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date = new Date();
  constructor(
    private authService: AuthService,
    private router: Router) { }
  user: User
  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }
}
