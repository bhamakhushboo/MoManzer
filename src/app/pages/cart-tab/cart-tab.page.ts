import { Component, Injectable, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { MenulistService } from 'src/app/services/menulist.service';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cart-tab',
  templateUrl: './cart-tab.page.html',
  styleUrls: ['./cart-tab.page.scss'],
})
export class CartTabPage implements OnInit {

  public cartItem: string[] = [];
  public productsInCart: Menu[] = [];

  constructor(
    private menulistservice: MenulistService
  ) { }

  ngOnInit() {
    this.cartItem = JSON.parse(localStorage.getItem("cart"));

    for (let i = 0; i < this.cartItem.length; i++ ) {
      this.menulistservice.getProduct(this.cartItem[i]).subscribe((result) => {
        const resultproduct = result as Menu;
        this.productsInCart.push(resultproduct);
      });
    }



  }

}
