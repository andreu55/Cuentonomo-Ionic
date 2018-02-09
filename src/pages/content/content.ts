import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {

  api_token:string;

  gastos: [
    {
      id:number,
      total:string,
      base:string,
      desgr:string,
      iva:string,
      concepto:string,
      fecha:string
    }
  ];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController,
    public api: Api
  ) {
    this.api_token = localStorage.getItem("api_token");
  }

  ionViewWillEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando gastos...'
    });
    loading.present();

    let headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.api_token
      }
    };

    let seq = this.api.post('gastos/get', {}, headers).share();

    seq.subscribe((res: any) => {

      if (res.status == 'success') {
        this.gastos = res.gastos;
        loading.dismiss();
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

    // return seq;
  }

  borraGasto(gasto_id) {

    let headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.api_token
      }
    };

    let seq = this.api.post('gasto/borrar', {'id':gasto_id}, headers).share();

    seq.subscribe((res: any) => {

      if (res.status == 'success') {
        // this.gastos
        // $scope.items.splice(index, 1);
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
