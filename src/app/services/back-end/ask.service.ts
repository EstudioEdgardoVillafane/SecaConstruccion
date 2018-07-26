import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Ask } from '../../model/ask';

@Injectable({
  providedIn: 'root'
})
export class AskService {
  constructor( private fireBase: AngularFireDatabase ) { }
  
  listAsks: AngularFireList<any>;
  aux = new Ask;

  getAsk() {
    return this.listAsks = this.fireBase.list('preguntas');
  }

  updateStatus(object){
    this.listAsks.update (object.$key, {
      status: 0,
    });
  }

  getJsonForName(mail:string, json){
    return of(json.find((ask => ask.mail === mail)));
  }

  insertAsk(object : Ask) {
    this.listAsks.push ({
      ask: object.ask,
      client: object.client,
      date: object.date,
      product: object.product,
      response: "",
      estado: "Sin responder",
      status: 1
    });
  }

  updateAsk(object : Ask) {
    this.listAsks.update(object.$key,{
      response: object.response,
      estado: "Respondido"
    });
  }

  deleteUser($key) {
    this.listAsks.remove($key);
  }
}
