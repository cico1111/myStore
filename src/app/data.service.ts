import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Item } from './models/Item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 

  cart: Map<Item, number>= new Map<Item, number>()
  fullname!: string;
 

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
  }

  showCart() {
    return this.cart
  }

  setCart(cart:Map<Item, number>){
    this.cart= cart
  }
  totalPrice(){
    let total : number=0
    for(let [key, value] of this.cart){    
     total += key.price*value
    }      
    return total
  }
  setInfo(name: string){
    this.fullname = name
  }
  getInfo(){
    return this.fullname
  }

  clearCart(){
    this.cart.clear()
  }

}
