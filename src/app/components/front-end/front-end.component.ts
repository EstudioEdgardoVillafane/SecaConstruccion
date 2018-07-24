import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/global/session.service';
import { ClientService } from '../../services/back-end/client.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../services/front-end/notification.service';

@Component({
  selector: 'app-front-end',
  templateUrl: './front-end.component.html',
  styleUrls: ['./front-end.component.css']
})
export class FrontEndComponent implements OnInit {

  constructor(private sessionService : SessionService, private clientService : ClientService, private route : Router, private notificationService : NotificationService) {}

  clientOnline : string;
  listClient : any[];
  notifications : number;
  ngOnInit() {
    this.clientService.getUser()
    .snapshotChanges()
    .subscribe(item => {
      this.listClient = [];
      item.forEach(element => {
        const x = element.payload.toJSON();
        x['$key'] = element.key;
        this.listClient.push(x);
      });
      
      let y = localStorage.getItem("aux");
        if(y != undefined){ 
            this.clientOnline = y; 
          this.notificationService.getNotification()
          .snapshotChanges()
          .subscribe(item => {
            let aux = [];
            item.forEach(element => {
              let x = element.payload.toJSON();
              x["$key"] = element.key;
              if(x['isLook'] == false){
                aux.push(x);
              }
            });
            this.notifications = aux.length;
          });
        }     
    });
    
  }
  handleExitSession(){
    localStorage.removeItem("aux");
    this.clientOnline = undefined;
  }
  handleSearchProduct(inputSearch){
    // this.route.navigateByUrl("/busqueda/"+inputSearch.value)
    if (this.route.navigated === false) {
      // Case when route was not used yet
      this.route.navigateByUrl("/busqueda/"+inputSearch.value);
    } else {
      // Case when route was used once or more
      this.route.navigateByUrl('/home').then(
        () => {
          this.route.navigateByUrl("/busqueda/"+inputSearch.value);
        });
    }
  }
}
