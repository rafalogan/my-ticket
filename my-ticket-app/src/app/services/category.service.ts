import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ICategory } from 'app/types/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoriesUrl = `${environment.api}${environment.categories}`;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.categoriesUrl);
  }
}