import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public loggedIn = false;
  public cartItem: string[] = [];

  constructor() {
    localStorage.setItem("cart", JSON.stringify(this.cartItem));

  }
}
