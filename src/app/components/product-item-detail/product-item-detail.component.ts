import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.css']
})
export class ProductItemDetailComponent implements OnInit{
 id!: number;
 quantity: number = 1;
 items: Item[] = [];
 item: Item | undefined;


  constructor(private route: ActivatedRoute, private dataService: DataService){ }


  ngOnInit(): void {   
   
    this.route.params.subscribe(params => {
      this.id =parseInt(params['id'])         
    })
    
    this.dataService.getItemById(this.id).subscribe((item) => {
      this.item = item;
    });
   

  }
  onSubmit(item: Item, e: any){

  }

}
