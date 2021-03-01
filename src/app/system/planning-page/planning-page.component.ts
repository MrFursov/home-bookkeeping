import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../shared/models/category.model';
import { CategoriesService } from '../shared/services/categories.service';
import { BillService } from '../shared/services/bill.service';
import { EventsService } from '../shared/services/events.service';
import { Bill } from '../shared/models/bill.model';
import { MyEvent } from '../shared/models/event.model';
import { combineLatest, Subscription } from 'rxjs';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {


  constructor(
    private categoriesService: CategoriesService,
    private billService: BillService,
    private eventsService: EventsService) { }

  categories: Category[] = []
  bill: Bill;
  events: MyEvent[] = []
  s1: Subscription
  isLoaded = false;
  //outcome = {}


  ngOnInit() {
    // this.categoriesService.getCategories()
    //   .subscribe((categories: Category[]) => {
    //     this.categories = categories
    //     this.isLoaded = true
    //   })

    // this.billService.getBill().subscribe((bill: Bill) => {
    //   this.bill = bill
    //   this.isLoaded = true
    // })

    // this.eventsService.getEvent().subscribe((events: MyEvent[]) => {
    //   for (const item of events) {
    //     this.outcome[item.category] = 0
    //     if(item.type === 'outcome'){
    //       this.outcome[item.category] += item.amount;
    //    }
    //   }
    // })
    this.s1 = combineLatest([
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvent()]
    ).subscribe((data: [Bill, Category[], MyEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    })


  }
  getCategoryCost(cat: Category): number {
    const catEvents = this.events.filter(e => e.category === cat.id && e.type === 'outcome');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }


  ngOnDestroy(){
    if(this.s1){
      this.s1.unsubscribe();
    }
  }

}
