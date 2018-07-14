import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../../../services/back-end/client.service';
@Component({
  selector: 'app-update-client',
  templateUrl: './update-client.component.html',
  styleUrls: ['./update-client.component.css']
})
export class UpdateClientComponent implements OnInit {

  constructor(private clientService: ClientService) { }

  clientList;
  boolChangePassword = false;
  boolDontChangePassword = true;

  ngOnInit() {
    this.clientList = this.clientService.selectKeyClient
    console.log(this.clientList)
  }
//-----------Store----------//
  handleSendUser(){    
    this.clientService.updateUser(this.clientList)
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
