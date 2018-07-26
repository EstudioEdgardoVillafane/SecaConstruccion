import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/back-end/user.service';
import { Location } from '@angular/common';
import { User } from '../../../../model/user';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.css']
})
export class StoreUserComponent implements OnInit {

  constructor(private userService : UserService, private location: Location,public snackBar: MatSnackBar) { }

  objectUser = new User();
  userList: any[];

  ngOnInit() {
    this.userService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.userList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.userList.push(x);
      });
    })
  }
//-----------Store----------//
  handleSendUser(){
    let validation = 0;
    (this.objectUser.user == null) ? this.snackBar.open("Ingrese un nombre", "Ok!",{duration: 1000}): validation++;
    (this.objectUser.password == null) ? this.snackBar.open("Ingresar contraseña", "Ok!",{duration: 1000}): validation++;
    (this.objectUser.confirm != this.objectUser.password ) ? this.snackBar.open("las contraseñas no coinsiden", "Ok!",{duration: 1000}): validation++;
    (this.objectUser.mail == null) ? this.snackBar.open("Ingrese un mail", "Ok!",{duration: 1000}): validation++;
    if(validation == 4){
    this.userService.insertUser(this.objectUser);
    this.location.back();
    }
  }
}
