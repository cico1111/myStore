import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() item!: Item; 
  quantity!: number;
  addedItem!: object;
  @Output() added = new EventEmitter();
  constructor(){ 
    this.quantity = 1;
  }
  onSubmit(){
    this.addedItem={item: this.item, quantity:this.quantity}
    this.added.emit(this.addedItem)
  }
}
