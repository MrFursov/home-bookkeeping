import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApi } from "src/app/shared/core/base-api";
import { Category } from "../models/category.model";

@Injectable()
export class CategoriesService extends BaseApi{
  constructor(http: HttpClient){
    super(http)
  }
  addCategory(category: Category):Observable<any>{
    return this.post('categories', category)
  }
  getCategories(): Observable<Category[]>{
    return this.get('categories')
  }
  updateCategory(category: Category): Observable<Category>{
    return this.put(`categories/${category.id}`, category)
  }
  getCategoriesById(id: number){
    return this.get(`categories/${id}`)
  }
}
