import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cart } from './models/Cart';
import { Item } from './models/Item';

@Injectable({
  providedIn: 'root'
})
export class DataService {
 

  cart: Map<number, number>= new Map<number, number>()
  //cartItem: Map<Item, number>= new Map<Item, number>()
  fullname!: string;
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
    
    if(this.cart.has(id)){      
      const a = this.cart.get(id)
      console.log("^^^^",this.cart.get(id))
      if(a!==undefined){
      this.cart.set(id, Number(a)+Number(quantity)) 
      }
        
    }else{
    
      this.cart.set(id, quantity)   

    }
    console.log(this.cart)  
      
}

  // getCartItems():Observable<Map<Item, number>>{
  //   let cartItem = new Map<Item, number>()
  //   for(let [key, value] of this.cart){
  //     this.getItemById(key).subscribe((x) => {
  //       if(x)
  //         cartItem.set(x,value)
  //       })
  //   }  
  //   return new Observable((subscriber) => {    
  //     subscriber.next(cartItem);  
  //   });
  // }
  getCartItem():Observable<Cart[]>{
    let cartItem :Cart[]= new Array()
    for(let [key, value] of this.cart){
      this.getItemById(key).subscribe((x) => {
        if(x)
          cartItem.push({id:x.id,name:x.name,price:x.price,url:x.url,description:x.description,quantity:value})
        })
    }  
    return new Observable((subscriber) => {    
      subscriber.next(cartItem);  
    });
  }
  getPrice(): Observable<Map<number, number>>{
    let price = new Map<number, number>()
 
    for(let [key, value] of this.cart){
      this.getItemById(key).subscribe((x) => {
        if(x)
          price.set(key,x.price*value)
        })
    }  
   
    return new Observable((subscriber) => {    
      subscriber.next(price);  
    });
    
  }
  
// getCartItems(): Observable<Map<Item, number>> {
//   return  new Observable((subscriber) => {
//     console.log('Hello');
//     subscriber.next(42);
//   });
//   let cartItem = new Map<Item, number>()
//   for(let [key, value] of this.cart){
       
      
//         cartItem.set(getItemById(key),value)
        
//        }
//   return cartItem
// }

  // showCart() {  
  //   for(let [key, value] of this.cart){
  //    if(this.item){
  //     this.getItemById(key).subscribe((item) => {
  //       this.item = item;
  //     });
  //     this.cartItem.set(this.item,value)
  //     }
  //    }
  //  console.log(this.cartItem)
  //   return this.cartItem
  // }

  setCartItem(id: number, quantity:number){   
    this.cart.set(id, quantity)
  }
  removeCartItem(id: number){   
    this.cart.delete(id)
  }
  // totalPrice(){
  //   let total : number=0
  //   for(let [key, value] of this.cart){   
  //     this.getItemById(key).pipe().subscribe((p)=>this.item=p) 
  //     if(this.item)
  //     total += this.item.price*value
  //   }      
  //   return total
  // }
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
