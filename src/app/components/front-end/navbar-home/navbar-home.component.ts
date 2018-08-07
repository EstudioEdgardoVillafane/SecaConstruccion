import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { SeccionService } from '../../../services/back-end/seccion.service';
import { Router } from '@angular/router';
import { ClientService } from '../../../services/back-end/client.service';
import { NotificationService } from '../../../services/front-end/notification.service';

@Component({
  selector: 'app-navbar-home',
  templateUrl: './navbar-home.component.html',
  styleUrls: ['./navbar-home.component.css']
})
export class NavbarHomeComponent implements OnInit {
  
  nameToSearch : string;
  viewNavbar = false;
  clickMenu = false;
  listSeccions : any[];

  constructor(
    private seccionService : SeccionService,
    private Router : Router,
    private clientService : ClientService,
    private notificationService : NotificationService
  ) { }


  /**
   * If the window scroll-y is better of 240px, then the second navbar is visible.
   * You can change the value of the scrollPosition 
   */
  onScroll(){
    const scrollPosition = window.pageYOffset
    this.viewNavbar = (scrollPosition >= 240) ? true : false;
    if(scrollPosition >= 230 && this.viewNavbar == false){
      let x = document.getElementById("search-fixed");
    }
  }
  
  ngOnInit() {
    this.listOfSeccion();
    this.clientValidation();
  }
  
  handleOpenCategory(){
    this.clickMenu = (this.clickMenu === true) ? false : true;
  }

  listOfSeccion(){
    this.seccionService.getSeccion()
    .snapshotChanges()
    .subscribe(item => {
      this.listSeccions = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        this.listSeccions.push(x);
      });
    })
  }


  //Configuration of navbar

  clientOnline : string;
  listClient : any[];
  notifications : number;

  //Searching if got an user online

  clientValidation(){
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
              if(x['isLook'] === false && x['client'] === y){
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
    this.Router.navigateByUrl("/home");
  }
  handleSearchProduct(urlToGo : string, type? : string ) : void {
    if(this.nameToSearch === undefined){
      this.nameToSearch = "all";
    }
    if(type === "seccion"){
      if (this.Router.navigated === false) {
        // Case when route was not used yet
        this.Router.navigateByUrl(urlToGo);
      } else {
        // Case when route was used once or more
        this.Router.navigateByUrl('/home').then(
          () => {
            this.Router.navigateByUrl(urlToGo);
          });
      }
    }else if ( type === "busqueda"){ 
      if(this.Router.navigated === false) {
        this.Router.navigateByUrl(urlToGo + this.nameToSearch);
      }else {
        this.Router.navigateByUrl('/home').then(
        () => {
          this.Router.navigateByUrl(urlToGo + this.nameToSearch);
        });
      }
    }
  }
  
}
