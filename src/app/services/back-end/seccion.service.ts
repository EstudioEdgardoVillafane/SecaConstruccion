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
  listEtiquetas: AngularFireList<any>;
  listSeccion: AngularFireList<any>;
  listSeccionFilter: AngularFireList<any>; // list filter
  listCategoriaFilter: AngularFireList<any>; // list filter

  constructor( private fireBase: AngularFireDatabase ) { }

  getSeccion() {
    return this.listSeccion = this.fireBase.list('seccion');
  }


  /** We are filter the seccion for add category */

  getEtiquetas() {
    return this.listEtiquetas = this.fireBase.list('etiquetas', ref => ref.orderByChild("count"));
  }

  /** We are filter the seccion for add categorie -- GET SOME CATEGORY */
  getSeccionFilterToAddCategoria(key) {
    return this.listSeccionFilter = this.fireBase.list('seccion/'+key+"/categoria");
  }

  getCategoriaFilterToAddOption(keySeccion, keyOption) {
    return this.listCategoriaFilter = this.fireBase.list('seccion/'+keySeccion+"/categoria/"+keyOption+"/opcion");
  }

  insertEtiquetas(etiquetaName) {
    this.listEtiquetas.push({
      name: etiquetaName,
      count: 1
    });
  }
  updateEtiqueta(countValue, key) {
    this.listEtiquetas.update(key, {
      count: countValue
    });
  }

  insertCategoria(nameCategoria, nameSection) {
    this.listSeccionFilter.push({
      name: nameCategoria,
      section: nameSection
    });
  }

  insertOption(optionName, categoriaName) {
    this.listCategoriaFilter.push({
      name: optionName,
      categoria: categoriaName
    });
  }

  insertSeccion(seccionObject) {
    this.listSeccion.push ({
      name: seccionObject.seccion.replace(/ /g, '-'),
    });
  }

  updateSeccion(seccionObject: Seccion) {
    this.listSeccion.update(seccionObject.$key, {
      name: seccionObject.name,
      // password: seccionObject.password
    });
  }
  updateOption(key, data) {
    this.listCategoriaFilter.update(key, {
      name: data,
    });
  }

  getJsonForName(name: string, json) {
    return of(json.find((seccion => seccion.name === name)));
  }

  getJsonForNameCategory(name, json) {
    return of(json.find((categoria => categoria.name === name)));
  }

  getJsonOfCategoriaForKey(key, json) {
    return of(json.find((categoria => categoria.$key === key)));
  }
  getJsonOfOptionForKey(key, json) {
    return of(json.find((categoria => categoria.$key === key)));
  }

  deleteSeccion($key) {
    this.listSeccion.remove($key);
  }
  deleteOption($key) {
    this.listCategoriaFilter.remove($key);
  }
}
