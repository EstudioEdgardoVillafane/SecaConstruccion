import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/front-end/notification.service';
import { Notification } from '../../../model/notification';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  listNotification = new Array();
  listNewNotification = new Array();
  constructor(private notificationService : NotificationService) { }


  ngOnInit() {
    let y = localStorage.getItem("aux");

    this.notificationService.getNotification()
    .snapshotChanges()
    .subscribe(item => {
      this.listNotification = [];
      this.listNewNotification = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["$key"] = element.key;
        if(x['client'] === y){
          if(x["isLook"] === true ){
            this.listNotification.push(x);
          }else{
            this.listNewNotification.push(x);
          }
        }
      });
    });
  }
  handleDoArchive(object : Notification){
    this.notificationService.updateNotification(object);
  }
  handleDoDelete(object : Notification){
    this.notificationService.removeNotification(object);
  }
}
