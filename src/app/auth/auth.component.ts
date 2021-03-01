import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FadeStateTrigger} from '../shared/animations/fade.animation'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  animations: [FadeStateTrigger]
  //styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  @HostBinding('@fade') a = true
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['./login'])
  }

}
