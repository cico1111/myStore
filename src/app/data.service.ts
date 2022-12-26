import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from './models/Item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>('http://localhost:4200/assets/data.json');
  }
  getItemById(id: number):  Observable<Item|undefined>{
    return this.http.get<Item[]>('http://localhost:4200/assets/data.json').pipe(
      map((items: Item[]) => {      
        return items.find((p: Item) => p.id === id);
      })
    )
  }
}
