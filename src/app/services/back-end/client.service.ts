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

  getJsonForName(mail:string, json){
    return of(json.find((client => client.mail === mail)));
  }
  
  getJsonByCode(code:string, json){
    return of(json.find((client => client.code === code)));
  }
  insertUser(clientObject: Client) {
    this.listClient.push ({
      name: clientObject.name,
      password: clientObject.password,
      mail: clientObject.mail,
      validate : false,
      code: clientObject.code
    });
  }

  updateUser(clientObject: Client) {
    this.listClient.update(clientObject.$key, {
      name: clientObject.name,
      password: clientObject.password,
      mail: clientObject.mail,
    });
  }

  validateClient(clientObject: Client) {
    this.listClient.update(clientObject.$key, {
      validate: true
    });
  }
  deleteUser($key) {
    this.listClient.remove($key);
  }
}