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
    this.totalPrice=this.dataService.totalPrice()
    this.fullname = this.dataService.getInfo()
    
  }
  clearCart(){
    this.dataService.clearCart()
    console.log("clearcart:",this.dataService.showCart().size)
    this.router.navigateByUrl('')
  }
}
