import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/back-end/user.service';
import { Location } from '@angular/common';
import { User } from '../../../../model/user';

@Component({
  selector: 'app-store-user',
  templateUrl: './store-user.component.html',
  styleUrls: ['./store-user.component.css']
})
export class StoreUserComponent implements OnInit {

  constructor(private userService : UserService, private location: Location) { }

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
    this.userService.insertUser(this.objectUser);
    this.location.back();
  }
}
