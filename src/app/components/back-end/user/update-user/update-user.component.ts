import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/back-end/user.service';
import { Password } from '../../../../model/password';
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

  changePassword = new Password;

  ngOnInit() {
    this.userList = this.userService.jsonUser;
  }
//-----------Update----------//
handleUpdateUser(){
  let validation = 0;
  if(  this.boolChangePassword == false  ){

    (this.userList.user == "") ? this.snackBar.open("Ingrese un nombre", "Ok!"): validation++;
    (this.userList.mail == "") ? this.snackBar.open("Ingresar contraseña", "Ok!"): validation++;
    
    
    if(validation == 2 ){
      this.userService.updateUser(this.userList)
      this.location.back();
    }
    }else{
      (this.changePassword.new != this.changePassword.confirm) ? this.snackBar.open("Contraseñas distintas", "Ok!"): validation++;
      (this.changePassword.old != this.userList.password) ? this.snackBar.open("Ingresar la contraseña actual", "Ok!"): validation++;

      if(validation == 2 ){
        this.userList.password = this.changePassword.new
        this.userService.updateUser(this.userList)
        this.location.back();
      }
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
