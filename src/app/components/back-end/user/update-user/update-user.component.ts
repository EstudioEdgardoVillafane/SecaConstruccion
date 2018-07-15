import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/back-end/user.service';
import { User } from '../../../../model/user';
import { Location } from '@angular/common';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  constructor(private userService : UserService, private location : Location,public snackBar: MatSnackBar) { }

  userList;

  boolChangePassword = false;
  boolDontChangePassword = true;

  ngOnInit() {
    this.userList = this.userService.selectKeyUser
    console.log(this.userList)
  }
//-----------Update----------//
handleSendUser(userList : User){
  let validation = 0;
    (this.userList.user == "") ? this.snackBar.open("Ingrese un nombre", "Ok!"): validation++;
    (this.userList.mail == "") ? this.snackBar.open("Ingresar contraseña", "Ok!"): validation++;

    if(validation == 2){
    this.userService.updateUser(userList)
    this.location.back();
    }
  }
//-----------Change Password-------//
  handleChangePassword(){
    this.boolChangePassword = true;
    this.boolDontChangePassword = false;
  }
  handleDontChangePassword(){
    this.boolChangePassword = false;
    this.boolDontChangePassword = true;
  }
}
