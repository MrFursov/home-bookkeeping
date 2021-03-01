import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.css']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency: any;
  currencies: string[] = [];
  date: Date = new Date();
  dollar: number;
  euro: number;
  rub: number;
  constructor() { }

  ngOnInit(): void {
    this.dollar = this.currency[0].sale
    this.euro = this.currency[1].sale
    this.rub = this.currency[2].sale
  }

}
