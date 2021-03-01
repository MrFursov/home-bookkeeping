import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Category } from '../../shared/models/category.model';
import { MyEvent } from '../../shared/models/event.model';
import { CategoriesService } from '../../shared/services/categories.service';
import { EventsService } from '../../shared/services/events.service';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: []
})
export class HistoryDetailComponent implements OnInit, OnDestroy {
  event: MyEvent;
  category: Category;
  isLoaded= false;
  s1:Subscription;

  constructor(private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.s1 = this.route.params
    .pipe(mergeMap((params: Params)=>this.eventsService.getEventById(params['id'])))
    .pipe(mergeMap((event: MyEvent)=>{
      this.event=event;
      return this.categoriesService.getCategoriesById(event.category)
    }))
    .subscribe((category: Category)=>{
      this.category = category;
      this.isLoaded = true
    })
  }

  ngOnDestroy(){
    if(this.s1){
      this.s1.unsubscribe()
    }
  }

}
