import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';


@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent {
  fullname!: string; 
  totalPrice!: number;
  constructor(private dataService: DataService, private router: Router){ }
  ngOnInit(): void {    
    this.fullname = this.dataService.getInfo().name
    this.totalPrice =  this.dataService.getInfo().totalPrice
  }
  clearCart(){
    this.dataService.clearCart() 
    this.router.navigateByUrl('')
  }
}
