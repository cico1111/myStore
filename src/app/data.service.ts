import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Cart } from './models/Cart';
import { Item } from './models/Item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 

  cartId: Map<number, number>= new Map<number, number>()
 
 
  info ={name:'', totalPrice:0}
  item: Item | undefined;


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

  addToCart(id: number, quantity: number) :void{
    
    if(this.cartId.has(id)){      
      const a = this.cartId.get(id)
      console.log("^^^^",this.cartId.get(id))
      if(a!==undefined){
        this.cartId.set(id, Number(a)+Number(quantity))       
      }        
    }else{
      this.cartId.set(id, quantity)  
    }      
  }
  getCartItems(): Observable<Cart[]> {
    return new Observable<Cart[]>((subscriber) => {
      let items = Array.from(this.cartId.keys()).map((id) => {
        return this.getItemById(id);
      });

      if (items.length == 0) {
        subscriber.next(new Array<Cart>());
      }

      forkJoin(items).subscribe((product) => {
        const cart = new Array<Cart>();
        product.forEach((product) => {
          if (product !== undefined) {
            let item = product as Item;
            let quantity = this.cartId.get(item.id) || 0
            cart.push({
              item: item,
              quantity: quantity,
            });
          }
        });
        subscriber.next(cart);
      });
    });
  }
  setCartItem(id: number, quantity:number){   
    this.cartId.set(id, quantity)     
  }
  removeCartItem(id: number){   
    this.cartId.delete(id)     
  }
  setInfo(name: string, total:number){
    this.info={ name: name,
    totalPrice:total}
  }
  getInfo(){
    return this.info
  }

  clearCart(){
    this.cartId.clear()   
  }  
}
  