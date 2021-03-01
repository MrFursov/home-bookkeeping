import { Component, HostBinding, OnInit } from '@angular/core';
import { FadeStateTrigger } from '../shared/animations/fade.animation';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  animations: [FadeStateTrigger]
})
export class SystemComponent implements OnInit {
  @HostBinding('@fade') a = true
  constructor() { }

  ngOnInit() {
  }

}
