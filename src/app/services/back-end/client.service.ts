import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Client } from '../../model/client';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor( private fireBase: AngularFireDatabase ) { }

  listClient: AngularFireList<any>;
  selectKeyClient = new Client();

  getUser() {
    return this.listClient = this.fireBase.list('client');
  }

  getJsonForName(mail: string, json) {
    return of(json.find((client => client.mail === mail)));
  }
  getJsonByUserName(name: string, json) {
    return of(json.find((client => client.name === name)));
  }

  insertUser(clientObject: Client) {
    this.listClient.push ({
      name: clientObject.name,
      password: clientObject.password,
      mail: clientObject.mail,
      validate : 0,
      code: Math.random().toString(36).substring(7),
      surname: '' ,
      phone: '',
      organization: '',
      direction: '',
      pc: '',
      country: '',
      location: '',
      offers: ''
    });
  }

  updateUser(clientObject: Client) {
    this.listClient.update(clientObject.$key, {
      name: clientObject.name,
      password: clientObject.password,
      mail: clientObject.mail,
      surname: clientObject.surname,
      phone: clientObject.phone,
      organization: clientObject.organization,
      direction: clientObject.direction,
      pc: clientObject.pc,
      country: clientObject.country,
      location: clientObject.location,
      offers: clientObject.offers
    });
  }

  deleteUser($key) {
    this.listClient.remove($key);
  }
}
