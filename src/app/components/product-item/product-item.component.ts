import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input()
  item!: Item; 
  quantity!: number;
  constructor(private dataService: DataService){ }
  onSubmit(){
  
    if(this.item){
        alert(`${this.item.name} is in cart!${this.quantity} `)
        this.dataService.addToCart(this.item, this.quantity)
    }
  
  }
}
