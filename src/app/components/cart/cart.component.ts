import { Component } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Map<Item, number>= new Map<Item, number>()
  constructor(private dataService: DataService){ }

  
  ngOnInit(): void {
    this.cart=this.dataService.showCart()   
  }
}
