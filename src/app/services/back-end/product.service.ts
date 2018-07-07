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
  
  insertUser(userObject: User) {
    // this.listUser.push ({
    //   user: userObject.user,
    //   position: userObject.position,
    //   password: userObject.password
    // });
  }

  updateUser(userObject) {
    // this.listUser.update(userObject.$key, {
    //   user: userObject.user,
    //   password: userObject.password
    // });
  }

  deleteUser($key) {
    this.listProducts.remove($key);
  }

}
