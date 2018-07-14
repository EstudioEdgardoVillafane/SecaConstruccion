import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/back-end/client.service';
import { Location } from '@angular/common';
import { Client } from '../../../../model/client';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-store-client',
  templateUrl: './store-client.component.html',
  styleUrls: ['./store-client.component.css']
})
export class StoreClientComponent implements OnInit {

  constructor(private clientService: ClientService, private location : Location, public snackBar: MatSnackBar) { }

  objectClient = new Client();
  clientList: any[];

  ngOnInit() {
    this.clientService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.clientList = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        this.clientList.push(x);
      });
    })
  }
  formStoreClient
  formObjectClient
  request
  productToAdd
//-----------Store----------//
  handleSendClient(){

      this.clientService.insertUser(this.objectClient);

      this.formStoreClient = document.getElementById("formStoreClient");
        this.formObjectClient = new FormData(this.formStoreClient);
          this.request = new XMLHttpRequest();
          this.request.open("POST", "php/send-mail.php", true);
          this.request.send(this.formObjectClient);
          this.request.onload = (e) => {
            console.log("some");
            console.log(this.request)
          }
      
      // this.location.back();
    }
  

}
