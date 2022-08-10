import { Component, Injectable, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { CartTabPage } from '../cart-tab.page';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.scss'],
})
export class CartListComponent implements OnInit {

  public productsInCart: Menu[] = [];
  constructor(private carttab: CartTabPage) {
    this.productsInCart = this.carttab.productsInCart;
   }

  ngOnInit()
  {
    this.productsInCart = this.carttab.productsInCart;
  }

}
