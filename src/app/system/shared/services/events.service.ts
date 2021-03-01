import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApi } from "src/app/shared/core/base-api";
import { MyEvent } from "../models/event.model";

@Injectable()
export class EventsService extends BaseApi{
  constructor(public http: HttpClient){
    super(http)
  }

  addEvent(event: MyEvent): Observable<MyEvent>{
    return this.post('events', event)
  }

  getEvent(): Observable<MyEvent[]>{
    return this.get('events')
  }
  getEventById(id: string){
    return this.get(`events/${id}`)
  }
}

