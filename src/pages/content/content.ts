import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  api_token:string;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public api: Api
  ) {
    this.api_token = localStorage.getItem("api_token");
  }

  borraGasto(gasto_id) {

    console.log(gasto_id);

    let headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.api_token
      }
    };

    let seq = this.api.post('gasto/borrar', {'id':gasto_id}, headers).share();

    seq.subscribe((res: any) => {

      if (res.status == 'success') {
        let toast = this.toastCtrl.create({
          message: "¡Gasto borrado!",
          duration: 2000,
          position: 'bottom',
          showCloseButton: true,
          closeButtonText: 'yeah!'
        });
        toast.present();
      } else {
      }
    }, err => {
      // console.error('ERROR', err);
      let toast = this.toastCtrl.create({
        message: "Error",
        duration: 2000,
        position: 'bottom'
      });
      toast.present();
    });

    return seq;
  }

}
