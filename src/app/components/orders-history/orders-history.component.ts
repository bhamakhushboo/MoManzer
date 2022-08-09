import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/interfaces/menu';
import { Order } from 'src/app/interfaces/order';
import { MenulistService } from 'src/app/services/menulist.service';

@Component({
  selector: 'app-orders-history',
  templateUrl: './orders-history.component.html',
  styleUrls: ['./orders-history.component.scss'],
})
export class OrdersHistoryComponent implements OnInit {

  public order: Order;
  public orders: string[];
  public orderproduct: Menu[];

  constructor(private menulistservice: MenulistService) {}

  ngOnInit() {
    this.menulistservice.getOrder(localStorage.getItem('id')).subscribe((result) => {
        const resultorder = result as Order;

        this.order = resultorder;

        this.orders = this.order['itemid'];
        for (let i = 0; i < this.orders.length; i++ ) {
          //console.log(this.orders[i]);

          this.menulistservice.getProduct(this.orders[i]).subscribe((result) => {
            const productresult = result as Menu;

            this.orderproduct.push(productresult);
            console.log(this.orderproduct);

          });

        }
        
      });
      
  }
}
