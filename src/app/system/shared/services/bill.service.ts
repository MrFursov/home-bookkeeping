import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Bill } from "../models/bill.model";

@Injectable()

export class BillService{
    constructor(private http: HttpClient){}

    getBill(): Observable<any>{
      return this.http.get('http://localhost:3000/bill');
    }

    getCurrency(): Observable<any>{
      return this.http.get('https://api.privatbank.ua/p24api/pubinfo?exchange&json&coursid=11')
    }

    updateBill(bill: Bill): Observable<any>{
      return this.http.put('http://localhost:3000/bill', bill)
    }
}
