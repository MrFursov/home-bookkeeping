import { Component, Input, OnInit } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';


@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.css']
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any


  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit(): void {
    this.dollar = this.bill.value / this.currency[0].sale
    this.euro = this.bill.value / this.currency[1].sale
  }

}
