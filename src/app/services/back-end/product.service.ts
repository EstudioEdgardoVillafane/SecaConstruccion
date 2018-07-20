import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../model/user';
import { Product } from '../../model/product';
import { AngularFireAction } from 'angularfire2/database/interfaces';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  listProducts : AngularFireList<any>;
  listEtiquetas : AngularFireList<any>;

  constructor( private fireBase: AngularFireDatabase ) { }

  getProduct() {
    return this.listProducts = this.fireBase.list('product', ref => ref.orderByChild("order"));
  }

  getEtiquetas(key){
    return this.listEtiquetas = this.fireBase.list("product/"+key+"/etiqueta");
  }

  insertProduct(productObject : Product){
    this.listProducts.push({
      name: productObject.name,
      slug: productObject.slug,
      price: productObject.price,
      url: productObject.url,
      code: productObject.code,
      description: productObject.description,
      seccion: productObject.seccion,
      categoria: productObject.categoria,
      option: productObject.option,
      order: productObject.order,
      etiqueta: productObject.etiqueta,
      favorite: 0,
      status: 1
    });
  }
  updateProductFavorite(favoriteValue, key){
    this.listProducts.update(key,{
      favorite: favoriteValue 
    });    
  }
  updateProduct(key, productObject : Product){
    this.listProducts.update(key,{
      name: productObject.name,
      slug: productObject.slug,
      price: productObject.price,
      url: productObject.url,
      code: productObject.code,
      description: productObject.description,
      seccion: productObject.seccion,
      categoria: productObject.categoria,
      option: productObject.option,
      order: productObject.order,
      etiqueta: productObject.etiqueta,
      favorite: 0,
      status: 1
    });
  }

  getProductForKey(key, json){
    return of(json.find((producto => producto.$key === key)));
  }
  getProductForSlug(slug, json){
    return of(json.find((producto => producto.slug === slug)));
  }
 
 
  insertEtiqueta(name){
    this.listEtiquetas.push({
      name: name
    });
  }


  updateStatus(productObject){
     this.listProducts.update(productObject.$key, {
        status: 0,
      });
  }
  updateOrden(orderValue, key){
    this.listProducts.update(key, {
       order: orderValue,
     });
 }
  duplicateProduct(productObject : Product){
    this.listProducts.push({
      name: productObject.name,
      slug: productObject.slug,
      price: productObject.price,
      url: productObject.url,
      description: productObject.description,
      seccion: productObject.seccion,
      categoria: productObject.categoria,
      option: productObject.option,
      code: productObject.code,      
      order: productObject.order,
      etiqueta: productObject.etiqueta,
      favorite: 0,
      status: 1
    });
  }
  deleteProduct($key) {
    this.listProducts.remove($key);
  }

}
