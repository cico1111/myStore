import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Item } from 'src/app/models/Item';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 
  items: Item[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getItems().subscribe(data => {
      this.items = data;
    });   
  }

  addtoCart(addedItem:{item: Item, quantity:number}){
    alert(`${addedItem.item.name} is in cart!${addedItem.quantity} `)
    this.dataService.addToCart(addedItem.item.id, addedItem.quantity)    
  }
 
}
