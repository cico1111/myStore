import { Component,  OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import {Router} from '@angular/router';
import { Cart } from 'src/app/models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
 
  cart: Cart[] = [];  
 
  total: number = 0
  fullname!: string;
  address!: string;
  credit!: string; 
  
  constructor(private dataService: DataService, private router:Router){ }

  
  ngOnInit(): void {  
    
   this.dataService.getCartItems().subscribe((x) => {     
      this.cart= x    
      console.log("init",this.cart)  
      this.total=this.totalPrice(this.cart)  
      console.log("init",this.total)        
    }); 
  }

  cal(p: Cart){     
        if(p.quantity>0){
          this.dataService.setCartItem(p.item.id, p.quantity) 
        }else{         
          this.dataService.removeCartItem(p.item.id)          
          this.total=this.totalPrice(this.cart)
          alert(`${p.item.name} id delete from cart`)
          this.ngOnInit() 
        }          
      this.total=this.totalPrice(this.cart)   
  }
  
  totalPrice(cart:Cart[] ): number{    
    let sum = 0;    
    cart.forEach(
      (x)=>{
        sum += x.item.price * x.quantity
      }
    )  
    return sum    
  } 

  onSubmit(){
    this.router.navigateByUrl('/confirmation');
    this.dataService.setInfo(this.fullname, this.total)

  }

}
 


