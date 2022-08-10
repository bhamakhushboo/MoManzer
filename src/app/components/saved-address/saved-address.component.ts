import { Component, Injectable, OnInit } from '@angular/core';
import {
  NativeGeocoderOptions,
  NativeGeocoder,
  NativeGeocoderResult,
} from '@awesome-cordova-plugins/native-geocoder/ngx';
import { Geolocation } from '@capacitor/geolocation';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-saved-address',
  templateUrl: './saved-address.component.html',
  styleUrls: ['./saved-address.component.scss'],
})
export class SavedAddressComponent implements OnInit {
  public address_value: string;

  constructor(private nativeGeocoder: NativeGeocoder) {}

  ngOnInit() {
    this.address_value = localStorage.getItem('address');
  }

  public async setAddressToCurrentLocation(): Promise<void> {
    const options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    const coordinates = await Geolocation.getCurrentPosition();

    this.nativeGeocoder
      .reverseGeocode(
        coordinates.coords.latitude,
        coordinates.coords.longitude,
        options
      )
      .then((result: NativeGeocoderResult[]) => {
        const firstResult = result[0];
        // console.log(firstResult);
        //  this.address_value = `${firstResult.locality} ${firstResult.subLocality} ${firstResult.countryName}, ${firstResult.postalCode}`
        this.address_value =
          firstResult.locality +
          ' ' +
          firstResult.subLocality +
          ' ' +
          firstResult.countryName +
          ' ' +
          firstResult.postalCode;
      })
      .catch((error: any) => console.log(error));
  }
}
