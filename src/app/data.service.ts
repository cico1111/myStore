import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from './models/Item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 

  cart: Map<Item, number>= new Map<Item, number>()
 

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
  addToCart(p: Item, quantity: number) :void{
    this.cart.set(p, quantity)
    console.log(this.cart)
  }

  showCart() {
    return this.cart
  }
}
