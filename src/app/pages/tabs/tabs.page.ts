import { Component, Injectable } from '@angular/core';
import { CartListComponent } from '../cart-tab/cart-list/cart-list.component';
import { CartTabPage } from '../cart-tab/cart-tab.page';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private carttab: CartTabPage,
    private cartlist: CartListComponent) {}

  refreshCart(){
    this.carttab.ngOnInit();
    this.cartlist.ngOnInit();
  }

}
