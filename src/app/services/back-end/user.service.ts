import { Injectable } from '@angular/core';

// FireBase
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { User } from '../../model/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  listUser: AngularFireList<any>;

  constructor( private fireBase: AngularFireDatabase ) { }

  getUser() {
    return this.listUser = this.fireBase.list('user');
  }

  insertUser(userObject: User) {
    this.listUser.push ({
      name: userObject.user,
      password: userObject.password
    });
  }

  updateUser(userObject) {
    this.listUser.update(userObject.$key, {
      user: userObject.user,
      password: userObject.password
    });
  }

  deleteUser($key) {
    this.listUser.remove($key);
  }
}
