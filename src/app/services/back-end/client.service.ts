import { Injectable } from '@angular/core';
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

  insertUser(clientObject: Client) {
    this.listClient.push ({
      name: clientObject.name,
      password: clientObject.password,
      mail: clientObject.mail,
      validate : 0
    });
  }

  updateUser(clientObject: Client) {
    this.listClient.update(clientObject.$key, {
      name: clientObject.name,
      password: clientObject.password,
      mail: clientObject.mail,
    });
  }

  deleteUser($key) {
    this.listClient.remove($key);
  }
}