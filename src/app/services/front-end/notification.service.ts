import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Ask } from '../../model/ask';
import { Notification } from '../../model/notification';
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor( private fireBase: AngularFireDatabase ) { }
  
  listNotification: AngularFireList<any>;

  getNotification() {
    return this.listNotification = this.fireBase.list('notification');
  }

  removeNotification(object : Notification){
    this.listNotification.remove(object.$key);
  }
  updateNotification(object : Notification){
    this.listNotification.update (object.$key, {
      isLook: true,
    });
  }

  insertNotification(object : Notification) {
    this.listNotification.push ({
      client : object.client,
      response : object.response,
      publication : object.publication,
      slug : object.slug,
      img : object.img,
      isLook : false
    });
  }
}