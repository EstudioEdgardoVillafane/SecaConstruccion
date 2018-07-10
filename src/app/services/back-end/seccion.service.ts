import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { AngularFireList } from 'angularfire2/database/interfaces';
import { AngularFireDatabase } from 'angularfire2/database';
import { Seccion } from '../../model/seccion';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  listSeccion : AngularFireList<any>;
  listSeccionFilter : AngularFireList<any>; //list filter
  listCategoriaFilter : AngularFireList<any>; //list filter

  constructor( private fireBase: AngularFireDatabase ) { }

  getSeccion() {
    return this.listSeccion = this.fireBase.list('seccion');
  }

  /** We are filter the seccion for add categorie */
  getSeccionFilterToAddCategoria(key) {
    return this.listSeccionFilter = this.fireBase.list('seccion/'+key+"/categoria");
  }

  getCategoriaFilterToAddOption(keySeccion, keyOption) {
    return this.listCategoriaFilter = this.fireBase.list('seccion/'+keySeccion+"/categoria/"+keyOption+"/option");
  }

  insertCategoria(nameCategoria){
    this.listSeccionFilter.push({
      name: nameCategoria
    });
  }

  insertOption(optionName){
    this.listCategoriaFilter.push({
      name: optionName
    });
  }

  insertSeccion(seccionObject) {
    this.listSeccion.push ({
      name: seccionObject.seccion,
    });
  }

  updateSeccion(seccionObject : Seccion) {
    this.listSeccion.update(seccionObject.$key, {
      name: seccionObject.name,
      // password: seccionObject.password
    });
  }
    
  getJsonOfSeccionForName(name:string, json){
    return of(json.find((seccion => seccion.name === name)));
  }

  getJsonOfCategoriaForKey(key, json){
    return of(json.find((categoria => categoria.$key === key)));
  }
  getJsonOfOptionForKey(key, json){
    return of(json.find((option => option.$key === key)));
  }

  deleteSeccion($key) {
    this.listSeccion.remove($key);
  }
}
