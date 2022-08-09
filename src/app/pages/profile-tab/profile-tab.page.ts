import { Component, OnInit } from '@angular/core';
import { AlertController, PopoverController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { SavedAddressComponent } from 'src/app/components/saved-address/saved-address.component';
import { Customer } from 'src/app/interfaces/customer';
import { MenulistService } from 'src/app/services/menulist.service';
import { ThemeComponent } from '../../components/theme/theme.component';

@Component({
  providers: [SavedAddressComponent],
  selector: 'app-profile-tab',
  templateUrl: './profile-tab.page.html',
  styleUrls: ['./profile-tab.page.scss'],
})
export class ProfileTabPage implements OnInit {

  selectedSegment = 'login';
  public loggedIn = false;


  public loggedCustomer: Customer = {
  id: localStorage.getItem('id'),
  email: localStorage.getItem('email'),
  dob: localStorage.getItem('dob'),
  password: localStorage.getItem('password'),
  address: "" };

  constructor(
    public popoverController: PopoverController,
    private alertController: AlertController,
    private menulistService: MenulistService,
    public savedaddress: SavedAddressComponent) {

    if(this.loggedIn) {
      this.selectedSegment = 'myprofile';
    }




  }

  ngOnInit() {
  }

  segmentChanged($event){
    this.selectedSegment = $event.detail.value;
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Please add new address',
      buttons: [{
        text: 'OK',
        role: 'confirm',
        handler: (data) => {
          this.update(data.address);
        },
      }],
      inputs: [
        {
          name: "address",
          placeholder: 'Address',
        },

      ],
    });

    await alert.present();
  }

  update(address){
    this.loggedCustomer.address = address;
    this.menulistService.updateAddress(this.loggedCustomer).subscribe(res => {
      this.loggedCustomer = res as Customer;
    });

    localStorage.setItem("address", address);
    this.ngOnInit();
  }

  async openThemePopover(ev: any) {
    const popover = await this.popoverController.create({
      component: ThemeComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }


}
