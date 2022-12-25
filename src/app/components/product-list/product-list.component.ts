import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/http.service';
import { Item } from 'src/app/models/Item';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  items: Item[] = [];

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.httpService.getItems().subscribe(data => {
      this.items = data;
    });
  }
}
