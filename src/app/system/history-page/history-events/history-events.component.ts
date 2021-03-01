import { Component, Input, OnInit } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { MyEvent } from '../../shared/models/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: []
})
export class HistoryEventsComponent implements OnInit {
  @Input() categories: Category[] = []
  @Input() events: MyEvent[] = [];
  searchValue = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount'
  event: MyEvent[] = []
  constructor() { }

  ngOnInit(): void {
    this.events.forEach((e) => {
      e.categoryName = this.categories.find(c => c.id === e.category).name;
    });
  }
  onType(events: MyEvent) {
    if (events.type === 'income') {
      return 'Доход'
    } else { return 'Расход' }
  }
  onClass(events: MyEvent) {
    if (events.type === 'income') {
      return 'success'
    } else { return 'danger' }
  }

  changeCriteria(field: string){
    const namesMap = {
      'amount': 'Сумма',
      'date': 'Дата',
      'categoryName': 'Категория',
      'type': 'Тип',
    }
    this.searchPlaceholder = namesMap[field]
    this.searchField = field

  }
  // onSearch(){
  //   console.log(this.event = this.events.filter(item => item[this.searchField] == this.searchValue))
  //   console.log(this.searchValue)
  //   console.log(this.searchField)
  // }

}
