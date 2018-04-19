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

    var tarde = new Date();
    var dia = new Date();

    dia.setHours(9, 30, 0); // Set hours, minutes and seconds
    tarde.setHours(18, 30, 0); // Set hours, minutes and seconds

    if (new Date() > dia) {
      dia.setDate(dia.getDate() + 1); // Suma un día
    } else { console.log('Aun no han pasado, configuramos "dia" para hoy!'); }

    if (new Date() > tarde) {
      tarde.setDate(tarde.getDate() + 1); // Suma un día
    } else { console.log('Aun no han pasado, configuramos "tarde" para hoy!'); }


    // console.log(dia);
    // console.log(tarde);

    this.localNotifications.clearAll();
    this.localNotifications.cancelAll();

    this.localNotifications.schedule([
      {
        id: 1,
        title: 'Genial!',
        text: 'Notificaciones activadas correctamente :)',
        group: 'notif',
        vibrate: false,
        sound: null
      },{
        id: 2,
        title: 'Genial!',
        text: 'Notificacion 10 segundos después :)',
        trigger: {at: new Date(new Date().getTime() + 10000)},
        led: {color: '7376DF', on: 200, off: 5000},
        group: 'notif',
        actions: [
          { id: 'yes', title: 'Yes' },
          { id: 'no',  title: 'No' }
        ]
      },{
        id: 10,
        title: '¡Buenos días! ¿Has guardado tu hora de entrada?',
        trigger: {at: dia},
        led: {color: '7376DF', on: 200, off: 5000},
        group: 'notif',
        vibrate: false,
        sound: null,
      },{
        id: 20,
        title: '¡Buenas tardes! ¿Has guardado tu hora de salida?',
        trigger: {at: tarde},
        led: {color: '7376DF', on: 200, off: 5000},
        group: 'notif',
        vibrate: false,
        sound: null,
      },{
        id: 11,
        title: 'Buenos días!',
        trigger: {at: new Date(dia.getDate() + 1)},
        led: {color: '7376DF', on: 200, off: 5000},
        group: 'notif',
        vibrate: false,
        sound: null,
      },{
        id: 21,
        title: 'Buenas noches!',
        trigger: {at: new Date(tarde.getDate() + 1)},
        led: {color: '7376DF', on: 200, off: 5000},
        group: 'notif',
        vibrate: false,
        sound: null,
      }
    ]);

  }
}
