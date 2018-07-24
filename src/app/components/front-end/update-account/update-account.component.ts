import { Component, OnInit } from '@angular/core';
import { Client } from '../../../model/client';
import { ClientService } from '../../../services/back-end/client.service';

@Component({
  selector: 'app-update-account',
  templateUrl: './update-account.component.html',
  styleUrls: ['./update-account.component.css']
})
export class UpdateAccountComponent implements OnInit {

  constructor(private clientService: ClientService) { }
  client = new Client;
  listClient: any[];
  name;
  mail;
  checkedBool = false;
  showEditPassBool = true;
  pass1: string;
  pass2: string;
  newPass: string;
  ngOnInit() {
    this.mail = localStorage.getItem('aux');
    this.listClient = [];
    this.clientService.getUser()
    .snapshotChanges()
    .subscribe(data => {
      data.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.listClient.push(x);
      });
        this.clientService.getJsonForName(this.mail, this.listClient)
        .subscribe((dataa) => {
          console.log(dataa);
           this.client = dataa;
      });
    });


  }
  updateUserInfo() {
    console.log(this.client);
    this.clientService.updateUser(this.client);
  }

  checked() {
    this.checkedBool = (this.checkedBool === true) ? false : true;

  }

  change() {
    this.showEditPassBool = (this.showEditPassBool === true) ? false : true;
  }
  updatePassword() {
    if (this.pass1 === this.pass2 && this.pass2 === this.client.password) {
      console.log(this.newPass);
      this.client.password = this.newPass;
      this.clientService.updateUser(this.client);
    }
  }

}
