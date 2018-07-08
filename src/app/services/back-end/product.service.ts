import { Injectable } from '@angular/core';

// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../model/user';
import { Product } from '../../model/product';

@Injectable({
  providedIn: 'root'
})


export class ProductService {

  listProducts : AngularFireList<any>;


  constructor( private fireBase: AngularFireDatabase ) { }

  getProduct() {
    return this.listProducts = this.fireBase.list('product');
  }
  
  insertUser(productObject) {
    // this.listUser.push ({
    //   user: userObject.user,
    //   position: userObject.position,
    //   password: userObject.password
    // });
  }

  updateUser(productObject) {
    // this.listUser.update(userObject.$key, {
    //   user: userObject.user,
    //   password: userObject.password
    // });
  }
  updateStatus(productObject){
     this.listProducts.update(productObject.$key, {
        status: 0,
      });
  }
  duplicateProduct(productObject : Product){
    this.listProducts.push({
      name: productObject.name,
      slug: productObject.slug,
      price: productObject.price,
      description: productObject.description,
      seccion: productObject.seccion,
      categoria: productObject.categoria,
      option: productObject.option,
      status: productObject.status
    });
  }
  deleteUser($key) {
    this.listProducts.remove($key);
  }

}
