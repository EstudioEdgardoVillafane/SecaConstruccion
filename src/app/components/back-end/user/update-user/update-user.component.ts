import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/back-end/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {


  constructor(private userService : UserService) { }

  userList;

  boolChangePassword = false;
  boolDontChangePassword = true;

  ngOnInit() {
    this.userList = this.userService.selectKeyUser
    console.log(this.userList)
  }
//-----------Store----------//
  handleSendCliente(){    
    this.userService.updateUser(this.userList)
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
