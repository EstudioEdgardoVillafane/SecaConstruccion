import { Injectable } from '@angular/core';

// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( private fireBase: AngularFireDatabase ) { }
  
  listUser: AngularFireList<any>;
  jsonUser = new User();
  getUser() {
    return this.listUser = this.fireBase.list('user');
  }

  insertUser(userObject: User) {
    this.listUser.push ({
      user: userObject.user,
      password: userObject.password,
      mail: userObject.mail
    });
  }

  updateUser(userObject) {
    this.listUser.update(userObject.$key, {
      user: userObject.user,
      password: userObject.password,
      mail: userObject.mail
    });
  }

  deleteUser($key) {
    this.listUser.remove($key);
  }
}
