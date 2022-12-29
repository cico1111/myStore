import { Component,  OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Item } from 'src/app/models/Item';
import {Router} from '@angular/router';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
  cart:Cart[] | undefined
  //cart: Map<Item, number>= new Map<Item, number>()
  price!: number;
  quantity!: number;
  total!: number;
  fullname!: string;
  address!: string;
  credit!: string;
  item: Item | undefined;
  
  constructor(private dataService: DataService, private router:Router){ }

  
  ngOnInit(): void {  
       this.dataService.getCartItem().subscribe((x) => {     
      this.cart= x      
      console.log("x",x)
      this.total=this.totalPrice(this.cart)
    });
        
    // this.dataService.getCartItems().subscribe((x) => {     
    //   this.cart= x      
    //   console.log("x",x)
    // });
    // console.log("x",this.cart)
    // this.total=this.totalPrice(this.cart) 
    // this.dataService.getCartItems().subscribe((x) => {     
    //   this.total=this.totalPrice(x)    
      
    // });
  }

  cal(item: Cart, cart:Cart[]){     
        if(item.quantity>0){
          this.dataService.setCartItem(item.id, item.quantity) 
        }else{
          
         
          this.dataService.removeCartItem(item.id)
          this.dataService.getCartItem().subscribe((x) => {     
            this.cart= x                   
          });
        }   
        this.total= this.totalPrice(cart)    
  }
  totalPrice(cart:Cart[]): number{ 
    let sum = 0    
    if(this.cart){
      for(let p of this.cart){    
        sum+=p.price*p.quantity         
       }   
    }         
   return sum
  }
  onSubmit(){
    this.router.navigateByUrl('/confirmation');
    this.dataService.setInfo(this.fullname)
  }
  // showCart() {  
      
  //   for(let [key, value] of this.cartId){
   
  //     this.dataService.getItemById(key).subscribe((item) => {
      
  //       this.item = item;
  //     });
  //     if(this.item){
  //       this.cart.set(this.item,value)
    
  //     }
    
  //    }
 
  //   return this.cart
  // }

  }
 


