import { Component,  OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Item } from 'src/app/models/Item';
import {Router} from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Map<Item, number>= new Map<Item, number>()
  price!: number;
  quantity!: number;
  total!: number;
  fullname!: string;
  address!: string;
  credit!: string;

  constructor(private dataService: DataService, private router:Router){ }

  
  ngOnInit(): void {
    this.cart=this.dataService.showCart()
    this.total=this.dataService.totalPrice()
  }

  cal(item: Item,quantity: number){     
    for(let [key, value] of this.cart){    
      if(item.id===key.id){
       this.cart.set(item, quantity)      
      }      
    }
    this.dataService.setCart(this.cart)   
    this.total = this.dataService.totalPrice()
  }
  onSubmit(){
    this.router.navigateByUrl('/confirmation');
    this.dataService.setInfo(this.fullname)
  }

  }
 


