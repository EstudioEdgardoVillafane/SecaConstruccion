import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/back-end/client.service';
import { Location } from '@angular/common';
import { Client } from '../../../../model/client';
import {MatSnackBar} from '@angular/material';
import { Password } from '../../../../model/password';


@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  constructor(private clientService: ClientService, private location : Location,public snackBar: MatSnackBar) { }

  clientList;
  boolChangePassword = false;
  boolDontChangePassword = true;
  changePassword = new Password;

  ngOnInit() {
    this.clientList = this.clientService.selectKeyClient
  }
//-----------Store----------//
handleUpdateClient(){
  let validation = 0;
  if( this.boolChangePassword == false){

    (this.clientList.name == "") ? this.snackBar.open("Ingrese un nombre", "Ok!",{duration: 1000}): validation++;
    (this.clientList.mail == "") ? this.snackBar.open("Ingresar contraseña", "Ok!",{duration: 1000}): validation++;

    if  (validation == 2){
      this.clientService.updateUser(this.clientList)
      this.location.back();
    }
  }else{

    (this.changePassword.new != this.changePassword.confirm) ? this.snackBar.open("Contraseñas distintas", "Ok!",{duration: 1000}): validation++;
    (this.changePassword.old != this.clientList.password) ? this.snackBar.open("Ingresar la contraseña actual", "Ok!",{duration: 1000}): validation++;

      if(validation == 2 ){
        this.clientList.password = this.changePassword.new
        this.clientService.updateUser(this.clientList)
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
