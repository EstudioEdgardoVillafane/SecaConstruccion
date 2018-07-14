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

  ngOnInit() {
    this.clientList = this.clientService.selectKeyClient
    console.log(this.clientList)
  }
//-----------Store----------//
handleSendClient(clientList : Client){

  // (clientList.name == null) ? this.snackBar

    this.clientService.updateUser(clientList)
    this.location.back();

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
