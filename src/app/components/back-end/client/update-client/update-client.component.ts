import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/back-end/client.service';
import { Location } from '@angular/common';
import { Client } from '../../../../model/client';
import {MatSnackBar} from '@angular/material';


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
  password

  ngOnInit() {
    this.clientList = this.clientService.selectKeyClient
    console.log(this.clientList)
    this.password = this.clientList.password;
  }
//-----------Store----------//
handleSendClient(clientList : Client){
  let validation = 0;
    (this.clientList.name == "") ? this.snackBar.open("Ingrese un nombre", "Ok!"): validation++;
    (this.clientList.mail == "") ? this.snackBar.open("Ingresar contraseña", "Ok!"): validation++;

console.log(validation)
    if(validation == 2){
      this.clientService.updateUser(clientList)
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
