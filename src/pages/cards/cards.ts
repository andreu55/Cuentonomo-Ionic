import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';

@IonicPage()
@Component({
  selector: 'page-cards',
  templateUrl: 'cards.html'
})
export class CardsPage {
  cardItems: any[];

  constructor(
    public navCtrl: NavController,
    private localNotifications: LocalNotifications
  ) {
    this.cardItems = [
      {
        user: {
          avatar: 'assets/img/marty-avatar.png',
          name: 'Marty McFly'
        },
        date: 'November 5, 1955',
        image: 'assets/img/advance-card-bttf.png',
        content: 'Wait a minute. Wait a minute, Doc. Uhhh... Are you telling me that you built a time machine... out of a DeLorean?! Whoa. This is heavy.',
      }
    ];
  }

  createNotification() {

    var noche = new Date();
    var dia = new Date();

    var lasOcho = new Date();
    lasOcho.setHours(8, 0, 0);

    // Si han pasado las 8 de la mañana, creamos la notificacion para el dia siguiente
    if (new Date() > lasOcho) {
      dia.setDate(dia.getDate() + 1); // Suma un día
      noche.setDate(noche.getDate() + 1); // Suma un día
    } else {
      console.log('Son antes de las 8, las configuramos para hoy!');
    }

    dia.setHours(8, 0, 0); // Set hours, minutes and seconds
    noche.setHours(1, 10, 0); // Set hours, minutes and seconds

    console.log(dia);
    console.log(noche);

    this.localNotifications.schedule([
      {
        id: 1,
        title: 'Genial!',
        text: 'Notificaciones activadas correctamente :)'
      },{
        id: 2,
        text: 'Notificación de prueba sin titulaco!',
        trigger: {at: new Date(new Date().getTime() + 7000)},
        led: {color: 'FF0000', on: 500, off: 1000}
      },{
        id: 3,
        title: 'Buenos días!',
        trigger: {at: dia},
        led: {color: '0000FF', on: 500, off: 3000}
      },{
        id: 4,
        title: 'Buenas noches!',
        trigger: {at: noche},
        led: {color: '00FF00', on: 500, off: 3000}
      }
    ]);

  }
}
