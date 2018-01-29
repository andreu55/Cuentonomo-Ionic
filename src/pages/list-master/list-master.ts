import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

// import { User } from '../../providers/providers';
import { FirstRunPage } from '../pages';
import { User } from '../../providers/providers';
import { Api } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {

  name:string;
  api_token:string;
  texto_boton:string;
  icono_boton:string;

  boton: { icono:string, texto:string } = {
    icono: 'add',
    texto: 'Guardar',
  };

  datos: { cantidad:number, concepto:string, tipo:number, fecha:string } = {
    cantidad: 2,
    tipo: 1,
    fecha: (new Date()).toISOString(),
    concepto: 'Cafetería',
  };

  constructor (
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public user: User,
    public api: Api
  ) {
    this.name = localStorage.getItem("name");
    this.api_token = localStorage.getItem("api_token");
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }


  nuevoGasto() {

    this.boton.icono = 'cloud-upload';
    this.boton.texto = 'Guardando';

    let headers = {
      'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.api_token
      }
    };


    let seq = this.api.post('gasto/nuevo', this.datos, headers).share();

    seq.subscribe((res: any) => {

      this.boton.icono = 'add';
      this.boton.texto = 'Guardar';

      if (res.status == 'success') {
        let toast = this.toastCtrl.create({
          message: "¡Gasto guardado!",
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

  logout() {
    this.user.logout();
    this.navCtrl.push(FirstRunPage);
  }

}
